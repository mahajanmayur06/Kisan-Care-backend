const mongoose = require('mongoose');

const SeedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }
}, {
        collection : 'seeds'
});

module.exports = mongoose.model('Seed', SeedSchema);
