const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    cartItems: [{
        itemName : {
            type : String
        },
        type : {
            type : String
        },
        quantity: {
            type : Number,
            default : 1
        }
    }],
    cartTotal: {
        type : Number,
        default : 0
    },
    address : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['Order Placed', 'Out for Delivery', 'Shipped', 'Delivered'],
        default: 'Order Placed'
    },
    payment: {
        type : Boolean,
        default : false
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
