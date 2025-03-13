import express from 'express';
import { signup, login } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiter for login (5 attempts per 15 minutes)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 5 login attempts
    message: 'Too many login attempts. Please try again later.'
});

// Rate limiter for signup (3 attempts per hour)
const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1000, // Limit each IP to 3 signup attempts
    message: 'Too many signup attempts. Please try again later.'
});

// Apply rate limiters
router.post('/signup', signupLimiter, signup);
router.post('/login', loginLimiter, login);

export default router;