import Message from "../models/message.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const addMessage = async (req, res) => {
  const { text, type } = req.body;

  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const msg = new Message({ text, type });
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: "Could not save message" });
  }
};
