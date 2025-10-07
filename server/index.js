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

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // TLS
  auth: {
    user: "apikey", // SendGrid me username hamesha 'apikey'
    pass: "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", // aapka generated API key
  },
});

async function sendMail() {
  try {
    const info = await transporter.sendMail({
      from: "sourabhbadgaiya2@gmail.com",    // verified sender email in SendGrid
      to: "sourabhbadgaiya273@gmail.com",
      subject: "Test Email from Render",
      text: "Hello! This is a test email using SendGrid + Nodemailer.",
    });
    console.log("✅ Email sent successfully:", info.messageId);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}

sendMail();




app.use("/api/users", require("./routes/users-route"));
app.use("/api/events", require("./routes/events-route"));
app.use("/api/payments", require("./routes/payments-route"));
app.use("/api/bookings", require("./routes/bookings-route"));
app.use("/api/reports", require("./routes/reports-route"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node+Express Server is running on port ${port}`);
});
