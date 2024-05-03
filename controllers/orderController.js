const User = require('../models/Seed')
const Seed = require('../models/Seed')
const Order = require('../models/Order')
const axios = require('axios')
const Stripe = require('stripe')

const stripe = new Stripe (process.env.STRIPE_api_key)

exports.placeOrder = async (req, res) => {
    const { username } = req.body
    try {
        const user = await User.findOne({ username : username})
        const address = await User.findOne({username : username})
        const newOrder = new Order({
            username : username,
            address : address._id,
            cart: user.cart,
            cartTotal : user.cartTotal
        })
        await newOrder.save()
        
    }catch (err) {
        console.log(err.message);
        res.status(500).json({ message : 'Internal server error'})
    }
}