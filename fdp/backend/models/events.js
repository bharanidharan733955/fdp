const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    category: String,
    description: String,
    duration: String,
    price: String,
    level: String,
    participants: String
}, { collection: 'events_details' });

module.exports = mongoose.model('Event', eventSchema);