import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Replace with frontend URL if needed
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join('uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected"); // Added console log for successful connection
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Fixed template string syntax
  })
  .catch((err) => console.error("MongoDB Connection Error:", err)); // Improved error logging
