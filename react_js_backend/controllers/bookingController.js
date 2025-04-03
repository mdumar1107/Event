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

// Fetch all user bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("eventId", "title imageUrl") // ✅ Fetch correct event fields
      .sort({ createdAt: -1 })
      .lean(); // ✅ Converts Mongoose objects to plain JSON

    // ✅ Format event details correctly
    const formattedBookings = bookings.map(booking => ({
      event: {
        _id: booking.eventId?._id || null,
        name: booking.eventId?.title || "Event Not Found",
        image: booking.eventId?.imageUrl
          ? `http://localhost:5000${booking.eventId.imageUrl}` // ✅ Fixes image URL
          : "/default-event.jpg", // ⬅️ Fallback for missing images
      },
      user: {
        name: booking.userFullName || "Unknown User",  // ⬅️ Use direct fields
        age: booking.age || "N/A",
        gender: booking.gender || "N/A",
        email: booking.email || "N/A",
        phone: booking.phoneNumber || "N/A",
      },
      tickets: booking.numTickets || 0,
    }));

    res.status(200).json(formattedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};



