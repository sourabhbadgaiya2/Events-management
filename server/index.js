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

const nodemailer = require("nodemailer");

async function testConnection() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,           // SSL
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // ya OAuth2 token
    },
    connectionTimeout: 10000, // 10 sec
    greetingTimeout: 5000,
    socketTimeout: 10000
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log("❌ Connection failed:", error.message);
    } else {
      console.log("✅ Connection successful!");
    }
  });
}

testConnection();



app.use("/api/users", require("./routes/users-route"));
app.use("/api/events", require("./routes/events-route"));
app.use("/api/payments", require("./routes/payments-route"));
app.use("/api/bookings", require("./routes/bookings-route"));
app.use("/api/reports", require("./routes/reports-route"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node+Express Server is running on port ${port}`);
});
