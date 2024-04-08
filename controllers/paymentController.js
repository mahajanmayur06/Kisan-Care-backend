const instance = require('../server'); 

const checkout = async (req, res) => {
    try {
        if (!instance || !instance.orders || !instance.orders.create) {
            throw new Error('Razorpay instance or orders.create method is not available.');
        }

        const options = {
            amount: 50000,  // amount in the smallest currency unit
            currency: 'INR',
            // receipt: 'order_rcptid_11'
        };
        const order = await instance.orders.create(options);
        console.log(order);     
        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            success: false,
            error: 'Error creating Razorpay order. Please try again later.'
        });
    }
};

module.exports = { checkout }; 
