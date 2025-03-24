import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userFullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  numTickets: { type: Number, required: true, min: 1, max: 3 },
  cardDetails: {
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  ticketUrl: { type: String }, // Stores the ticket file path
  createdAt: { type: Date, default: Date.now },
});

const Booking = model("Booking", bookingSchema);

export default Booking;
