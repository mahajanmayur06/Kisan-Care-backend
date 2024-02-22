const Seed = require('../models/Seed');
const User = require('../models/User');

exports.getCart = async (req, res) => {
    const username  = req.body.username
    
    try {
        const user = await User.findOne({ username: username }).exec()
        if (!user) {
            return res.status(404).json({ message : 'user not found'})
        }
        // const cartItems = user.cart
        // const cartName = 
        const cart = await Seed.find({ _id : user.cart})
        return res.status(200).json({ cart : cart })
    }
    catch (error) {
        console.log('Error while fetching items');
        res.status(500).json( {message : 'Server error'})
    }
}

exports.addToCart = async (req, res) => {
    const username = req.body.username;
    const itemId = req.body.itemId;
    
    try {
        const user = await User.findOne({ username });
        const item = await Seed.findOne({ _id: itemId }); // Use _id for MongoDB ObjectId

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        user.cart.unshift(item);
        console.log(`${item.name} added to cart successfully`);
        await user.save();

        return res.json({ message: `${item.name} added to cart successfully` });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};