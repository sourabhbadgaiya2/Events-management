import Stripe from "stripe";
import config from "../config/env.config.js";
import UserModel from "../models/user.models.js";
import sendEmail from "../helpers/send-email.js";
import EventModel from "../models/event.model.js";
import BookingModel from "../models/booking.model.js";

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const createBookingService = async (bookingData, userId) => {
  bookingData.user = userId;

  // Create booking
  const booking = await BookingModel.create(bookingData);

  // Update event tickets
  const event = await EventModel.findById(bookingData.event);
  const updatedTicketTypes = event.ticketTypes.map((ticketType) => {
    if (ticketType.name === bookingData.ticketType) {
      ticketType.booked =
        Number(ticketType.booked ?? 0) + Number(bookingData.ticketsCount);
      ticketType.available =
        Number(ticketType.available ?? ticketType.limit) -
        Number(bookingData.ticketsCount);
    }
    return ticketType;
  });

  await EventModel.findByIdAndUpdate(bookingData.event, {
    ticketTypes: updatedTicketTypes,
  });

  // Send confirmation email
  const user = await UserModel.findById(userId);
  const emailPayload = {
    email: user.email,
    subject: "Booking Confirmation - SoursEvents",
    text: `You have successfully booked ${bookingData.ticketsCount} ticket(s) for ${event.name}.`,
    html: ``,
  };

  await sendEmail(emailPayload);

  return booking;
};

export const cancelBookingService = async (payload, userId) => {
  const { eventId, paymentId, bookingId, ticketsCount, ticketTypeName } =
    payload;

  const refund = await stripe.refunds.create({
    payment_intent: paymentId,
  });

  if (refund.status !== "succeeded") {
    throw new Error("Refund failed");
  }

  await BookingModel.findByIdAndUpdate(bookingId, { status: "cancelled" });

  // Update event tickets
  const event = await EventModel.findById(eventId);
  const updatedTicketTypes = event.ticketTypes.map((ticketType) => {
    if (ticketType.name === ticketTypeName) {
      ticketType.booked = Number(ticketType.booked ?? 0) - Number(ticketsCount);
      ticketType.available =
        Number(ticketType.available ?? ticketType.limit) + Number(ticketsCount);
    }
    return ticketType;
  });

  await EventModel.findByIdAndUpdate(eventId, {
    ticketTypes: updatedTicketTypes,
  });

  const userObj = await UserModel.findById(userId);
  const emailPayload = {
    email: userObj.email,
    subject: "Booking Cancellation - SoursEvents",
    text: `You have successfully cancelled your booking for ${event.name}.`,
    html: ``,
  };

  await sendEmail(emailPayload);

  return { refundId: refund.id };
};
