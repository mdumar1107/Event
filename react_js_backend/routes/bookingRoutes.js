import express from "express";
import { bookEvent } from "../controllers/bookingController.js"; // Ensure correct import

const router = express.Router();

// Define the POST route
router.post("/book", bookEvent);

export default router;
