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
// const { default: OpenAI } = require('openai/index.mjs');
const { GoogleGenerativeAI } = require("@google/generative-ai");

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
// app.use('/checkout', require('./routes/paymentRoute'))

// open-ai integration
// Remove this line since we'll use dynamic import instead
// const { default: OpenAI } = require('openai/index.mjs');

// Instead, use dynamic import to load the OpenAI module
// let OpenAI;
// import('openai/index.mjs').then(module => {
//     OpenAI = module.default;

//     // Now you can use OpenAI here or inside your route handlers
//     const openai = new OpenAI({
//         apiKey: process.env.OPENAI_api_key
//     });

//     // Your route handler for '/getResponse' can use OpenAI
//     app.get('/getResponse', async (req, res) => {
//         try {
//             const prompt = req.body.promt;
//             const response = await openai.chat.completions.create({
//                 model: 'gpt-3.5-turbo',
//                 message: [{
//                     "role": "user",
//                     "content": prompt
//                 }],
//                 max_tokens: 100
//             });
//             console.log(response);
//             res.send(response); // Send the response back to the client
//         } catch(err) {
//             console.log(err.message);
//             res.json({message : err.message})
//         }
//     });

//     // Continue with other route handlers and server start code
// }).catch(err => {
//     console.error('Error loading OpenAI module:', err);
//     // Handle the error, perhaps by exiting the application or providing a fallback solution
// });


//!Generate content route

app.post('/order', async(req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id : process.env.RAZORPAY_key_id,
            key_secret : process.env.RAZORPAY_key_secret
        })
    
        const options = req.body;
        const order = await razorpay.orders.create(options);
    
        if (!order) {
            return res.status(500).json('Error occured')
        }
    }
    catch(err) {
        return res.json({ 'message' : err.message})
    }
})

// handling weather api
app.get('/weather-forecast', async (req, res) => {
    const cityName = req.query.cityName;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_api_key}`;

    try {
        const response = await axios.get(URL);
        console.log(response.data, " fetched");
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return res.status(500).json({ message: 'Error fetching weather data' });
    }
});

// Start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
