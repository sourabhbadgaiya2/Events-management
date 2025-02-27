import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../config/env.config.js";
import redisClient from "../config/redis.config.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["Organizer", "Attendee"],
      default: "Attendee",
    },
  },
  { timestamps: true }
);

//  genAuthToken
userSchema.methods.genAuthToken = async function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, config.JWT_SEC, {
    expiresIn: "1d",
  });

  try {
    // Blacklist old token if it exists
    const oldToken = await redisClient.get(`user:${this._id}:token`);
    if (oldToken) {
      await redisClient.set(`blacklist:${oldToken}`, "true", "EX", 86400);
    }

    // Store new token in Redis
    await redisClient.set(`user:${this._id}:token`, token, "EX", 86400);
  } catch (err) {
    console.error("❌ Redis Error:", err);
  }

  return token;
};

// compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// compare hash password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

export default User;
