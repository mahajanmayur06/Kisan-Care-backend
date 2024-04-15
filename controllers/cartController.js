const Seed = require('../models/Seed');
const User = require('../models/User');

exports.getCart = async (req, res) => {
    const username  = req.body.username
    
    try {
        const user = await User.findOne({ username: username }).exec()
        if (!user) {
            throw new Error("User not found1")
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
    const name = req.body.name;
    const type = req.body.type;
    const quantity = req.body.quantity
    
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

        const isDuplicate = user.cart.some(cartItem => cartItem.equals(item._id));

        if (isDuplicate) {
            const duplicateItem = user.cart.find(cartItem => cartItem.equals(item._id));
            if (duplicateItem.quantity !== quantity) {
                duplicateItem.quantity = quantity;
                await user.save();
                console.log(`${item.name} quantity updated in cart`);
                return res.json({ message: `${item.name} quantity updated in cart` });
            } else {
                console.log('Already in cart');
                return res.status(400).json({ message: 'Item is already in cart' });
            }
        }
        
        user.cart.unshift(item);
        await user.save();
        console.log(`${item.name} added to cart successfully`);
        return res.json({ message: `${item.name} added to cart successfully` });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
