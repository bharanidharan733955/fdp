const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    organization: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    agreeTerms: { type: Boolean, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    collection: 'register',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

registerSchema.virtual('userId').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model('Register', registerSchema);