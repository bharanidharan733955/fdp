const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');


router.get('/getevents', async(req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category ? { category } : {};

    try {
        const events = await Event.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;