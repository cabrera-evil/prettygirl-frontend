const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    delivery: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    estimatedDelivery: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);