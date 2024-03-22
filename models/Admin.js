const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    seeds: [
        {
            seedId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Seed'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, {
    collection: 'admins'
});

module.exports = mongoose.model('Admin', adminSchema);
