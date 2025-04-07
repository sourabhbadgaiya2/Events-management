import BookingModel from "../models/booking.model.js";
import EventModel from "../models/event.model.js";

export const generateAdminReportService = async ({
  startDate,
  endDate,
  eventId,
}) => {
  let query = {};

  if (eventId) {
    query.event = eventId;
  }

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate + "T23:59:59.999Z"),
    };
  }

  const bookings = await BookingModel.find(query);

  const totalBookings = bookings.length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "cancelled"
  ).length;
  const totalTickets = bookings.reduce((acc, b) => acc + b.ticketsCount, 0);
  const cancelledTickets = bookings
    .filter((b) => b.status === "cancelled")
    .reduce((acc, b) => acc + b.ticketsCount, 0);

  const totalRevenueCollected = bookings.reduce(
    (acc, b) => acc + b.totalAmount,
    0
  );
  const totalRevenueRefunded = bookings
    .filter((b) => b.status === "cancelled")
    .reduce((acc, b) => acc + b.totalAmount, 0);

  const report = {
    totalBookings,
    cancelledBookings,
    totalTickets,
    cancelledTickets,
    totalRevenueCollected,
    totalRevenueRefunded,
  };

  if (!eventId) return report;

  const event = await EventModel.findById(eventId);
  const ticketTypesAndThierSales = event.ticketTypes.map((ticketType) => {
    const relevantBookings = bookings.filter(
      (b) => b.ticketType === ticketType.name
    );
    return {
      name: ticketType.name,
      ticketsSold:
        relevantBookings.reduce((acc, b) => acc + b.ticketsCount, 0) || 0,
      revenue: relevantBookings.reduce((acc, b) => acc + b.totalAmount, 0) || 0,
    };
  });

  return {
    ...report,
    ticketTypesAndThierSales,
  };
};

export const generateUserReportService = async (userId) => {
  const bookings = await BookingModel.find({ user: userId });

  const totalBookings = bookings.length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "cancelled"
  ).length;
  const totalTickets = bookings.reduce((acc, b) => acc + b.ticketsCount, 0);
  const cancelledTickets = bookings
    .filter((b) => b.status === "cancelled")
    .reduce((acc, b) => acc + b.ticketsCount, 0);

  const totalAmountSpent = bookings.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalAmountReceivedAsRefund = bookings
    .filter((b) => b.status === "cancelled")
    .reduce((acc, b) => acc + b.totalAmount, 0);

  return {
    totalBookings,
    cancelledBookings,
    totalTickets,
    cancelledTickets,
    totalAmountSpent,
    totalAmountReceivedAsRefund,
  };
};
