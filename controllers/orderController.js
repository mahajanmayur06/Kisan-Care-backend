const User = require('../models/User');
const Order = require('../models/Order');
const Address = require('../models/Address')
const Seed = require('../models/Seed')
const Pesticide = require('../models/Pesticide')
const axios = require('axios');
const Stripe = require('stripe');
const Fertilizer = require('../models/Fertilizer');

const stripe = new Stripe(process.env.STRIPE_api_key);
const frontendURL = 'http://localhost:3000';

exports.placeOrder = async (req, res) => {
    const username = req.body.username
    const cartItems = req.body.cartItems
    const cartTotal = req.body.cartTotal
    try {
        const user = await User.findOne({ username: username });
        if(!user) {
            return res.json({ message : 'user not found'})
        }
        const address = await Address.findOne({ username: username });

        console.log('cart:', cartItems);
        
        const newOrder = new Order({
            username: username,
            address: address ? address._id : null,
            cartItems: [],
            cartTotal: cartTotal || 0,
        });
        for (cart of cartItems) {
            newOrder.cartItems.push({
                name : cart.name,
                price : cart.price,
                type: cart.type,
                seedType : cart.seedType || null,
                quantity : cart.quantity
            })
        }
        await newOrder.save()
        console.log(newOrder)
        await newOrder.save();
        user.cart = [];
        user.cartTotal = 0;
        await user.save();
        console.log('cart cleared during placing order');
        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        // console.log(line_items);
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendURL}/verify?cancel=true&orderId=${newOrder._id}`,
        });
        console.log('Order placed');
        res.json({success : true, session_url : session.url});
        // res.status(201).json({ message : 'Order placed', success : true, session_url : session.url, })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({success : true, message : err.message});
    }
};

exports.verifyOrder = async (req, res ) => {
    const { orderId, success } = req.body
    try {
        if (success === 'true') {
            await Order.findByIdAndUpdate(orderId, { payment : true})
            res.json({ success : true, message : 'Paid'})
        }
        else {
            await Order.findByIdAndDelete(orderId)
            res.json({ success : false, message : 'Not paid'})
        }
    }catch(err) {
        console.log(message);
        res.json({ success : false, message : err.message})
    }
}

exports.userOrders = async (req, res) => {
    const username = req.query.username
    try {
        const orders = await Order.find({ username : username})

        res.status(200).json({ success : true, orders : orders})
    }
    catch (err) {
        console.log(err.message);
        res.json({ success : false, message : err.message})
    }
}

exports.updateStatus = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, { status : req.body.status })
        res.json({ success : true, message : 'Status updated'})

    }catch (err) {
        console.log(err.message);
        res.status({ success : false, message : 'Error occured'})
    }
}