const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Register = require('../models/register.js');
require('dotenv').config();

const router = express.Router();

// Register Route
router.post('/register', async(req, res) => {
    try {
        const { fullName, email, phone, organization, gender, agreeTerms, password } = req.body;

        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Register({
            fullName,
            email,
            phone,
            organization,
            gender,
            agreeTerms,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                userId: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone,
                organization: newUser.organization
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Registration failed' });
    }
});

// Login Route
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                userId: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                organization: user.organization
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
    }
});

// ✅ Get All Users (for Admin)
router.get('/users', async(req, res) => {
    try {
        const users = await Register.find({}, '-password'); // Exclude password
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// ✅ Get User by ID
router.get('/users/:id', async(req, res) => {
    try {
        const user = await Register.findById(req.params.id, '-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
});

module.exports = router;