const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);