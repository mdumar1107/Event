import Event from "../models/event.js";

// 🔹 Unified Create Event Function (Handles Both Authenticated & Non-Authenticated Users)
export const CreateEvent = async (req, res) => {
  try {
    const { title, venue, startTime, endTime, startDate, endDate, description, imageUrl } = req.body;

    if (!title || !venue || !startTime || !endTime || !startDate || !endDate || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the request comes from an authenticated user
    const createdBy = req.user ? req.user.id : null;

    const newEvent = new Event({ 
      title, 
      venue, 
      startTime, 
      endTime, 
      startDate, 
      endDate, 
      description, 
      imageUrl, 
      
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
