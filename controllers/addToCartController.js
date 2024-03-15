const Seed = require('../models/Seed');
const User = require('../models/User');

exports.addToCart = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const type = req.body.type
    
    try {
        const user = await User.findOne({ username });
        const item = await Seed.findOne({ name : name, type : type}); // Use _id for MongoDB ObjectId

        if (!user) {
            throw new Error(`User ${username} not found`)
        }

        if (!item) {
            throw new Error('Item not found')
        }
        const isDuplicate = user.cart.some(cartItem => cartItem.equals(item._id));
        if (isDuplicate) {
            throw new Error('Already added to the cart...')
        }
        user.cart.unshift(item)
        await user.save();

        return res.json({ message: `${item.name} added to cart successfully` });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw new Error('Internal server error');
    }
};