const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: {
        type: String,
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
    estimatedDelivery: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Booking', bookingSchema);