import express from "express";

import { isOrganizer, verifyToken } from "../middleware/auth.middleware.js";
import { createEventValidation } from "../middleware/input-validation.js";

import {
  createEvent,
  deleteEvent,
  getEventById,
  getEventBySearch,
  updateEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post(
  "/create-event",
  verifyToken,
  isOrganizer,
  createEventValidation,
  createEvent
);

router.put("/edit-event/:id", verifyToken, isOrganizer, updateEvent);

router.delete("/delete-event/:id", verifyToken, isOrganizer, deleteEvent);

router.get("/get-events", verifyToken, getEventBySearch);

router.get("/get-event/:id", verifyToken, getEventById);

export default router;
