import express from "express";
import multer from "multer";
import path from "path";
import { CreateEvent, getEvents, getEventById } from "../controllers/eventController.js";

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images to an "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Event routes
router.post("/create", upload.single("image"), CreateEvent);
router.get("/", getEvents);

// 🔹 New Route: Get Event by ID
router.get("/:id", getEventById);

export default router;
