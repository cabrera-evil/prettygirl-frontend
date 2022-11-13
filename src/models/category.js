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
        public_id: String,
        secure_url: String
    }
});

module.exports = mongoose.model('Category', categorySchema);