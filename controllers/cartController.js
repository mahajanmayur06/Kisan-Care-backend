const Seed = require('../models/Seed');
const User = require('../models/User');

exports.getCart = async (req, res) => {
    const username = req.query.username;

    try {
        const user = await User.findOne({ username: username }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.cart.length === 0) {
            return res.status(404).json({ message: 'Cart is Empty' });
        }

        const cartItems = [];
        for (const cartItem of user.cart) {
            const item = await Seed.findOne({ _id: cartItem.seedId });
            if (item) {
                cartItems.push({ item, quantity: cartItem.quantity });
            }
        }

        console.log(cartItems);
        res.status(200).json(cartItems);
    } catch (error) {
        console.log('Error while fetching items:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.addToCart = async (req, res) => {
    const { username, name, type, quantity } = req.body;
    
    try {
        const user = await User.findOne({ username });
        const item = await Seed.findOne({ name, type });

        if (!user) {
            console.log('Username', username, 'not found');
            return res.status(404).json({ message: `User ${username} not found` });
        }

        if (!item) {
            console.log('Item not found');
            return res.status(404).json({ message: 'Item not found' });
        }
        
        const isDuplicate = user.cart.some(cartItem => cartItem.seedId.equals(item._id));

        if (isDuplicate) {
            return res.status(400).json({ message: 'maje aa gaye bhai' });
        }
        
        const cartItem = {
            seedId: item._id,
            quantity: quantity
        };

        user.cart.push(cartItem);
        await user.save();

        // Populate the cartItem's seedId field to get the complete seed object
        await user.populate('cart.seedId');
        
        console.log(user.cart);
        return res.json({ message: `${item.name} added to cart successfully`, cart: user.cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.clearCart = async (req, res) => {
    const username = req.body.username
    try {
        const user = await User.findOne({ username : username }).exec()
        user.cart = []
        await user.save()
        console.log('cart cleared');
        res.status(200).json({ message : 'Cart cleared successfully'})
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message : err.message})
    }
}