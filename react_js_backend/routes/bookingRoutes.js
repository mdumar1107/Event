import express from "express";
import { bookEvent, getUserBookings } from "../controllers/bookingController.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount, // Convert to paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// Booking route
router.post("/book", bookEvent);

// Verify payment & store booking
router.post("/verify-payment", async (req, res) => {
  const { paymentId, orderId, signature, bookingDetails } = req.body;

  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature === signature) {
      await bookEvent(
        {
          body: { ...bookingDetails, razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature },
        },
        res
      );
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
});

// ✅ NEW: Fetch all bookings
router.get("/bookings", getUserBookings);

export default router;
