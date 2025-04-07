import express from "express";
import { isOrganizer, verifyToken } from "../middleware/auth.middleware.js";

import {
  cancelBooking,
  createBooking,
  getAllBookings,
  getUserBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/create-booking", verifyToken, createBooking);

router.get("/get-user-bookings", verifyToken, getUserBooking);

router.get("/get-all-bookings", verifyToken, getAllBookings);

router.post("/cancel-booking", verifyToken, cancelBooking);

export default router;
