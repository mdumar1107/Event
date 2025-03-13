import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

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

        console.log("Generated Hashed Password:", hashedPassword); // Debugging output

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', hashedPassword });
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

        const user = await User.findOne({ email }).select('+password'); // Ensure password is retrieved
        if (!user) {
            return handleError(res, 400, 'Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return handleError(res, 400, 'Invalid credentials');
        }

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
