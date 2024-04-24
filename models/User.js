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
    location: {
        type : String,
        required : true
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    cart: [{
        itemName: {
            type : String
        },
        type: { 
            type : String
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    cartTotal : {
        type : Number,
        default : 0
    },
    wishList: [{
        itemName :{ 
            type : String
        },
        type : {
            type : String
        }
    }],
    myOrders: [{
        itemName : String,
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, {
    collection : 'users'
});

module.exports = mongoose.model('User', userSchema);
