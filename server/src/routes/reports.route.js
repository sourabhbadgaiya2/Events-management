import express from "express";

import {
  getAdminReports,
  getUserReports,
} from "../controllers/report.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/get-admin-reports", verifyToken, getAdminReports);

router.get("/get-user-reports", verifyToken, getUserReports);

export default router;
