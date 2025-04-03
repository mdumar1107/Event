import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },  // ✅ Ensure correct reference
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userFullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    numTickets: { type: Number, required: true },
    razorpay_payment_id: { type: String, required: false }, // ❌ Not required before payment
    razorpay_order_id: { type: String, required: false }, // ❌ Not required before payment
    razorpay_signature: { type: String, required: false }, // ❌ Not required before payment
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
