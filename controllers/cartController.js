const Fertilizer = require('../models/Fertilizer');
const Pesticide = require('../models/Pesticide');
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
        let total = 0;

        for (const cartItem of user.cart) {
            let item;
            if (cartItem.type === 'seed') {
                item = await Seed.findOne({ name: cartItem.itemName });
            } else if (cartItem.type === 'fertilizer') {
                item = await Fertilizer.findOne({ name: cartItem.itemName });
            } else {
                item = await Pesticide.findOne({ name: cartItem.itemName });
            }

            if (item) {
                let itemData = {
                    name: item.name,
                    price: item.price,
                    quantity: cartItem.quantity,
                    type: cartItem.type
                };
                if (cartItem.type === 'seed') {
                    itemData.seedType = item.type;
                } else {
                    itemData.discription = item.disc;
                }
                cartItems.push(itemData);
                total += item.price * cartItem.quantity;
            }
        }

        user.cartTotal = total;
        await user.save();
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
        let item;

        if (type === 'seed') {
            item = await Seed.findOne({ name });
        } else if (type === 'fertilizer') {
            item = await Fertilizer.findOne({ name });
        } else {
            item = await Pesticide.findOne({ name });
        }

        if (!user) {
            return res.status(404).json({ message: `User ${username} not found` });
        }

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        const hasItem = user.cart.filter(cartItem => cartItem.itemName === name && cartItem.type === type);

        if (hasItem.length > 0) { 
            if (hasItem[0].quantity !== quantity) {
                hasItem[0].quantity = quantity;
                await user.save();
                return res.status(201).json({ message: 'Quantity updated' });
            }
            return res.status(201).json({ message: 'No need to change quantity' });
        }
        
        user.cart.push({
            itemName: item.name,
            quantity: quantity,
            type: type
        });
          
        await user.save();

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
        user.cartTotal = 0
        await user.save()
        console.log('cart cleared');
        res.status(200).json({ message : 'Cart cleared successfully'})
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message : err.message})
    }
}

exports.removeFromCart = async (req, res) => {
    const {username, name }= req.body
    try {  
        const user = await User.findOne({ username : username}).exec()
        let itemArray = user.cart.filter((cartItem) => cartItem.itemName === name)

        if (itemArray[0].type === 'seed') {
            item = await Seed.findOne({ name });
        } else if (itemArray[0].type === 'fertilizer') {
            item = await Fertilizer.findOne({ name });
        } else {
            item = await Pesticide.findOne({ name });
        }

        user.cartTotal = user.cartTotal - item.price * itemArray[0].quantity
        user.cart = user.cart.filter((cartItem) => cartItem.itemName !== name)
        await user.save()
        console.log('Removed from cart');
        res.status(200).json(user.cart)
    }catch (err) {
        console.log(err.message);
        res.status(500).json({ message : err.message})
    }
}

exports.getCartTotal = async (req, res) => {
    const username = req.query.username
    try {
        const user =  await User.findOne({ username}).exec()
        res.status(200).json(user.cartTotal)
    } 
    catch(err) {
        console.log(err.message);
        res.status(500).json({ message : 'Internal Server error'})
    }
}