const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./config/db-config");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

connectMongoDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/users", require("./routes/users-route"));
app.use("/api/events", require("./routes/events-route"));
app.use("/api/payments", require("./routes/payments-route"));
app.use("/api/bookings", require("./routes/bookings-route"));
app.use("/api/reports", require("./routes/reports-route"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node+Express Server is running on port ${port}`);
});
