import Booking from "../models/booking.js"; // Import Booking model

export const bookEvent = async (req, res) => {
  try {
    const {
      eventId,
      userFullName,
      age,
      gender,
      email,
      phoneNumber,
      numTickets,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    // Validate required fields
    if (!eventId || !userFullName || !age || !email || !phoneNumber || !numTickets) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new booking
    const newBooking = new Booking({
      eventId,
      userFullName,
      age,
      gender,
      email,
      phoneNumber,
      numTickets,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });

    // Save booking to database
    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking successful!",
      ticketUrl: `/tickets/${newBooking._id}`, // You can generate a ticket URL
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};
