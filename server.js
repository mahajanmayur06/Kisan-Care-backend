const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const app = express();
const Razorpay = require('razorpay')
const PORT = process.env.PORT || 3500;

// importing files
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const dbConn = require('./config/dbConn')

// create instance of razopay
// const instance = new Razorpay({
//     key_id : process.env.RAZORPAY_key_id,
//     key_secret : process.env.RAZORPAY_key_secret
// });

// Connect to MongoDB
dbConn()

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/images', express.static('upload/images'));

// Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/seeds', require('./routes/seedRoutes'))
app.use('/seed/:id', require('./routes/seedRoutes'))
app.use('/addseed', require('./routes/seedRoutes'))
app.use('/removeseed/:id', require('./routes/seedRoutes'))
app.use('/cart', require('./routes/cart'));
app.use('/addToCart', require('./routes/addToCart'))
app.use('/checkout', require('./routes/paymentRoute'))


app.post('/order', async(req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id : process.env.RAZORPAY_key_id,
            key_secret : process.env.RAZORPAY_key_secret
        })
    
        const options = req.body;
        const order = await razorpay.orders.create(options);
    
        if (!order) {
            return res.status(500).send('Error occured')
        }
    }
    catch(err) {
        res.send(json({ 'message' : err.message}))
    }
})


// Start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
