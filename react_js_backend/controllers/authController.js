import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import crypto from 'crypto';
import sendEmail from '../helpers/sendEmail.js';

const handleError = (res, status, message) => {
    return res.status(status).json({ message });
};

// Signup Controller
export const signup = async (req, res) => {
    try {
        let { name, email, password, confirmPassword } = req.body;

        name = validator.trim(name);
        name = validator.escape(name);
        email = validator.normalizeEmail(email);

        if (!validator.isLength(name, { min: 3, max: 50 })) {
            return handleError(res, 400, 'Name must be between 3 and 50 characters');
        }

        if (!validator.isEmail(email)) {
            return handleError(res, 400, 'Invalid email format');
        }

        if (password !== confirmPassword) {
            return handleError(res, 400, 'Passwords do not match');
        }

        let user = await User.findOne({ email });
        if (user) {
            return handleError(res, 400, 'User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        handleError(res, 500, 'Internal server error');
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return handleError(res, 400, 'Email and password are required');
        }

        email = validator.normalizeEmail(email);

        if (!validator.isEmail(email)) {
            return handleError(res, 400, 'Invalid email format');
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return handleError(res, 400, 'Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return handleError(res, 400, 'Invalid credentials');
        }
// ✅ Update lastLogin timestamp
user.lastLogin = new Date();
await user.save(); // Save the updated user info in the database

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400 * 1000
        });

        res.json({ 
            message: 'Login successful', 
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Login Error:", error);
        handleError(res, 500, 'Internal server error');
    }
};

// Get User Details (from token)
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return handleError(res, 404, 'User not found');
        }
        res.json({ user });
    } catch (error) {
        console.error("Get User Error:", error);
        handleError(res, 500, 'Internal server error');
    }
};

// Logout User (Clears cookie)
export const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true, sameSite: 'strict' });
    res.json({ message: 'Logged out successfully' });
};

// ✅ Forgot Password Controller
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash the token before storing it
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Store hashed token with expiration (1 hour)
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1-hour expiration
        await user.save();

        // Send only the plain token in the email
        const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
        const message = `Click the link below to reset your password:\n\n${resetURL}`;

        await sendEmail(user.email, "Password Reset Request", message);

        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        console.error("Forgot Password Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Reset Password Controller
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword, confirmNewPassword } = req.body;

        if (!newPassword || !confirmNewPassword) {
            return handleError(res, 400, "All fields are required");
        }

        if (newPassword !== confirmNewPassword) {
            return handleError(res, 400, "Passwords do not match");
        }

        // 🔹 Hash the token to match stored value
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // 🔹 Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() } // Ensure token is still valid
        }).select("+password");

        if (!user) {
            return handleError(res, 400, "Invalid or expired token");
        }

        // ✅ Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // 🔹 Clear reset token fields (invalidate after first use)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: "Password reset successful. You can now log in." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        handleError(res, 500, "Server error");
    }
};

