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

    await newBooking.save(); // ✅ Ensures it saves in MongoDB

    res.status(201).json({
      success: true,
      message: "Booking successful!",
      booking: newBooking,  // ✅ Includes the newly created booking object
      ticketUrl: `/tickets/${newBooking._id}`, // ✅ Retains your ticket URL generation
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};
