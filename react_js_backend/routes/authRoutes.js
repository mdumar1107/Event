import express from 'express';
import rateLimit from 'express-rate-limit';
import authMiddleware from '../middlewares/authMiddleware.js'; // Add this middleware
import { signup, login, getUser, logout, forgotPassword, resetPassword } from '../controllers/authController.js';
import {getProfile,updateProfile,changePassword } from '../controllers/authController.js';

// 🔹 Import additional middleware & event controller
import authenticateUser from '../middlewares/authMiddleware.js'; 
import { CreateEvent } from '../controllers/eventController.js';

const router = express.Router();

// Rate limiter for login (5 attempts per 15 minutes)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    message: 'Too many login attempts. Please try again later.'
});

// Rate limiter for signup (3 attempts per hour)
const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1000,
    message: 'Too many signup attempts. Please try again later.'
});

// Authentication routes
router.post('/signup', signupLimiter, signup);
router.post('/login', loginLimiter, login);
router.get('/user', authMiddleware, getUser); // Fetch user details
router.post('/logout', logout); // Logout route
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// 🔹 Protect the create event route (without modifying your existing routes)
router.post("/create-event", authenticateUser, CreateEvent);

// Protect the event routes with authentication middleware
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);
export default router;