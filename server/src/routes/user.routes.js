import express from "express";
import {
  getAllUser,
  getCurrentUser,
  updateUser,
} from "../controllers/user.controller.js";
import { isOrganizer, verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/current-user", verifyToken, getCurrentUser);

router.get("/get-all-user", verifyToken, isOrganizer, getAllUser);

router.put("/update-user", verifyToken, updateUser);

export default router;
