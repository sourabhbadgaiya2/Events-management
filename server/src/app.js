import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

//! Import
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";
import reportRouter from "./routes/reports.route.js";
import ErrorHandlers from "./helpers/ErrorHandler.js";
import bookingRouter from "./routes/bookings.route.js";
import paymentRouter from "./routes/payments.route.js";
import ErrorHandler from "./middleware/customError.middleware.js";

const app = express();

//! middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//!Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reports", reportRouter);

//! Error Handler
app.all("*", (req, res, next) => {
  next(new ErrorHandlers(`req url not found ${req.url}`, 400));
});

app.use(ErrorHandler);

export default app;
