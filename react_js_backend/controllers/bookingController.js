import Booking from "../models/booking.js";
import Event from "../models/event.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import PDFDocument from "pdfkit";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function bookEvent(req, res) {
  try {
    const { eventId, userFullName, age, gender, email, phoneNumber, numTickets, cardDetails } = req.body;

    // Validate Event Exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Mask Card Number for security
    const maskedCardNumber = cardDetails.cardNumber.replace(/\d(?=\d{4})/g, "*");

    // Create Booking
    const newBooking = new Booking({
      eventId,
      userFullName,
      age,
      gender,
      email,
      phoneNumber,
      numTickets,
      cardDetails: {
        cardNumber: maskedCardNumber,
        expiryDate: cardDetails.expiryDate,
        cvv: "***", // Mask CVV
      },
    });

    // Generate Ticket PDF
    const ticketPath = join(__dirname, "../tickets", `${newBooking._id}.pdf`);
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(createWriteStream(ticketPath));

    pdfDoc.fontSize(20).text("Event Ticket", { align: "center" });
    pdfDoc.moveDown();
    pdfDoc.text(`Event: ${event.title}`);
    pdfDoc.text(`Date: ${event.startDate.day}-${event.startDate.month}-${event.startDate.year}`);
    pdfDoc.text(`Time: ${event.startTime.hour}:${event.startTime.minute} ${event.startTime.period}`);
    pdfDoc.text(`Venue: ${event.venue}`);
    pdfDoc.moveDown();
    pdfDoc.text(`Attendee: ${userFullName}`);
    pdfDoc.text(`Email: ${email}`);
    pdfDoc.text(`Phone: ${phoneNumber}`);
    pdfDoc.text(`Tickets: ${numTickets}`);
    pdfDoc.end();

    // Save ticket URL
    newBooking.ticketUrl = `/tickets/${newBooking._id}.pdf`;

    // Save to Database
    await newBooking.save();

    res.status(201).json({
      message: "Booking successful!",
      ticketUrl: newBooking.ticketUrl,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
}
