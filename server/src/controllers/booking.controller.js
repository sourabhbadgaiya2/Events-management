import { createBookingService } from "../service/booking.service.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await createBookingService(req.body, req.user._id);
    return res
      .status(201)
      .json({ message: "Booking created successfully", booking });
  } catch (error) {
    return next(error);
  }
};

export const getUserBooking = async (req, res) => {
  try {
    const bookings = await BookingModel.find({ user: req.user._id })
      .populate("event")
      .sort({ createdAt: -1 });

    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("event")
      .populate("user")
      .sort({ createdAt: -1 });

    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { userId } = req.user;
    const result = await cancelBookingService(req.body, req.user._id);
    return res
      .status(200)
      .json({ message: "Event cancelled successfully", ...result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
