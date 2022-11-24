const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    description:{
        products:{
            type: Array,
            required: true
        },
        total:{
            type: Number,
            default: 0
        }
    },
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
        default: false
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