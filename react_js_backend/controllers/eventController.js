import Event from "../models/event.js";
import Message from "../models/message.js"; // <-- ✅ Import Message model

// 🔹 Create Event Controller
export const CreateEvent = async (req, res) => {
  try {
    let { title, venue, startTime, endTime, startDate, endDate, description } = req.body;

    // Parse JSON fields
    startTime = JSON.parse(startTime);
    endTime = JSON.parse(endTime);
    startDate = JSON.parse(startDate);
    endDate = JSON.parse(endDate);

    if (!title || !venue || !startTime || !endTime || !startDate || !endDate || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Handle Image Upload (if any)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if request comes from an authenticated user
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
      createdBy,  
    });

    await newEvent.save();

     // ✅ Add message to messages collection
     await Message.create({
      text: `🎉 Event "${title}" created successfully!`,
      type: "success",
    });
    
    res.status(201).json({ message: "Event created successfully!", event: newEvent });

  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// 🔹 Get All Events Controller
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// 🔹 Get Event By ID Controller
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
