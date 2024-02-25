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

