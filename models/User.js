const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    address: {
        type: String,
        required : true,
        default : "Mumbai"
    },
    cart: [{
        seedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seed'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    wishList: [{
        seedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seed'
        }}
    ],
    myOrders: [{
        seedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seed'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, {
    collection : 'users'
});

module.exports = mongoose.model('User', userSchema);
