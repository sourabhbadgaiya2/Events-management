import Stripe from "stripe";
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import config from "../config/env.config.js";

const router = express.Router();

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "usd",
      description: "SoursEvents-Mern stack project",
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return next(error);
  }
});

export default router;
