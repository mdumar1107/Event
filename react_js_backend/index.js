import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from 'cookie-parser';
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js"; // Imported analytics routes
import subscriptionRoutes from "./routes/subscriptionRoutes.js"; // Imported subscription routes
import messageRoutes from "./routes/messageRoutes.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Adjust frontend URL if necessary
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions
app.use("/tickets", express.static(path.join(__dirname, "tickets")));
app.use("/api", subscriptionRoutes); // Added subscription API routes
app.use("/api/messages", messageRoutes); // Added message API routes


// Serve uploaded images
app.use("/uploads", express.static("uploads")); // Makes /uploads public

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/analytics", analyticsRoutes); // Added analytics API routes

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit process with failure
});
