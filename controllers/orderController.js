const User = require('../models/Seed')
const Seed = require('../models/Seed')
const Order = require('../models/Order')
const Stripe = require('stripe')

const stripe = new Stripe (process.env.STRIPE_api_key)

exports.placeOrder = async (req, res) => {
    const { username, cart, cartTotal } = req.body
    try {
        const user = await User.findOne({ username : username})
        const address = await User.findOne({username : username})
        const newOrder = new Order({
            username : username,
            
        })

    }catch (err) {
        console.log(err.message);
        res.status(500).json({ message : 'Internal server error'})
    }
}