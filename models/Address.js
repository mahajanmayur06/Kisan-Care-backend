const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    username: {
        type : String,
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
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true,
        default : "India"
    },
    phone_number: {
        type: String,
        // required: true
    }
});

module.exports = mongoose.model('Address', addressSchema);
