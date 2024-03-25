const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3500;

// importing files
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const dbConn = require('./config/dbConn')

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

// Start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
