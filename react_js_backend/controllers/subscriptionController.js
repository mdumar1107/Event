import sendEmail from "../helpers/sendEmail.js";
import Message from "../models/message.js"; // ✅ Import Message model

export const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const subject = "Welcome to EventHive!";
  const text = `
Hi there,

Thanks for subscribing to EventHive! 🎉

You'll now receive updates on the coolest events.

Stay tuned,
The EventHive Team
`;

  try {
    await sendEmail(email, subject, text);

    // ✅ Log a system message
    await Message.create({
      text: `📩 New subscriber: ${email}`,
      type: "info",
    });
    
    res.status(200).json({ message: "Subscription successful. Email sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
