const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const app = express();
const Razorpay = require('razorpay')
const PORT = process.env.PORT || 3500;

// importing files
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const dbConn = require('./config/dbConn');

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
app.use('/', require('./routes/user'));
app.use('/', require('./routes/seedRoutes'))
app.use('/', require('./routes/cart'));
app.use('/', require('./routes/genAI'))
app.use('/', require('./routes/wishList'))
app.use('/', require('./routes/fertilizers'))
app.use('/', require('./routes/pesticides'))
app.use('/', require('./routes/imageUpload'))
app.use('/', require('./routes/weather'))
// app.use('/checkout', require('./routes/paymentRoute'))

// Start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
