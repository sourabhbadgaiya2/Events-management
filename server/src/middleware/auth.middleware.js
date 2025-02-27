import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
import redisClient from "../config/redis.config.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, config.JWT_SEC);

    //  Check if token is blacklisted
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token is invalid. Please log in again." });
    }

    //  Check if token matches the latest stored one
    const storedToken = await redisClient.get(`user:${decoded._id}:token`);
    if (!storedToken) {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }

    if (storedToken !== token) {
      return res
        .status(401)
        .json({ message: "Invalid token. Please log in again." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    return res
      .status(403)
      .json({ message: "Invalid token", error: err.message });
  }
};

export const isOrganizer = async (req, res, next) => {
  if (req.user.role !== "Organizer") {
    return res
      .status(403)
      .json({ message: "Forbidden! Admin access required." });
  }
  next();
};
