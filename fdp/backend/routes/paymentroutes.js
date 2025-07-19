const express = require('express');
const router = express.Router();
const EventPayment = require('../models/eventpayment.js');
const mongoose = require('mongoose');

// POST: Store payment
router.post('/event-payment', async(req, res) => {
    console.log('Received payment:', req.body);
    const { userId, eventId, amount, transactionId } = req.body;

    try {
        const payment = new EventPayment({
            userId: new mongoose.Types.ObjectId(userId),
            eventId: new mongoose.Types.ObjectId(eventId),
            amount: Number(String(amount).replace(/[^\d.]/g, "")),
            transactionId,
            paymentStatus: 'Paid'
        });

        await payment.save();
        res.status(201).json({ message: 'Payment stored successfully', data: payment });
    } catch (error) {
        console.error('Payment save error:', error);
        res.status(500).json({ message: 'Payment failed to save', error: error.message });
    }
});

// GET: Payments by eventId
router.get('/event-payment/:eventId', async(req, res) => {
    const { eventId } = req.params;

    try {
        const payments = await EventPayment.find({ eventId }).populate('userId', 'fullName email phone');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
    }
});

// GET: Latest paid event for a user
router.get('/event-payment/user/:userId', async(req, res) => {
    const { userId } = req.params;
    try {
        const payment = await EventPayment.findOne({ userId, paymentStatus: 'Paid' })
            .sort({ paidAt: -1 })
            .populate('eventId');
        if (!payment) {
            return res.status(404).json({ message: 'No paid event found for this user' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user event', error: error.message });
    }
});

module.exports = router;