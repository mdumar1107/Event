import Event from "../models/event.js";


// Create Event
export const CreateEvent = async (req, res) => {
  try {
    const { title, venue, startTime, endTime, startDate, endDate, description, imageUrl } = req.body;

    if (!title || !venue || !startTime || !endTime || !startDate || !endDate || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({ title, venue, startTime, endTime, startDate, endDate, description, imageUrl });
    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
