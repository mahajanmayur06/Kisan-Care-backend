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
            return res.status(404).json({ message: 'User not found' });
        }

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const isDuplicate = user.cart.some(cartItem => cartItem.equals(item._id));
        if (isDuplicate) {
            return res.status(401).json({ message: 'Item already added to cart' });
        }
        user.cart.unshift(item)
        await user.save();

        return res.json({ message: `${item.name} added to cart successfully` });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};