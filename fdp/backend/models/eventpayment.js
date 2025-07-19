const mongoose = require('mongoose');

const eventPaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Failed'],
        default: 'Paid'
    },
    paidAt: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'event_payments' });

module.exports = mongoose.model('EventPayment', eventPaymentSchema);