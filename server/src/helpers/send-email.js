import nodemailer from "nodemailer";
import config from "../config/env.config.js";

const sendEmail = async ({ email, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.NODEMAILER_EMAIL,
        pass: config.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `SoursEvents <${config.NODEMAILER_EMAIL}>`,
      to: email,
      subject,
      text,
      html,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email: ", error);
    return error;
  }
};

export default sendEmail;
