import express from "express";
import { CreateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post("/create", CreateEvent);

export default router;
