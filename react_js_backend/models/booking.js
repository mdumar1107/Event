import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    userFullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: false },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    numTickets: { type: Number, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
