const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['shipping', 'billing'],
        required: true
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    address_line1: {
        type: String,
        required: true
    },
    address_line2: String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Address', addressSchema);
