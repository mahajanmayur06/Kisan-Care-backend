const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const seedRoutes = require('./routes/seedRoutes')

const app = express();
const PORT = 3500;
const CONNECTION_URI = "mongodb+srv://mongo_user:Mayur123@cluster0.cwjjseb.mongodb.net/project?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
    .then(() => {
        console.log('Connected to MongoDB successfully');
    }).catch(err => {
        console.log('No connection to MongoDB');
    });

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/images', express.static('upload/images'));

// Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/seeds', seedRoutes)
app.use('/seed/:id', seedRoutes)
app.use('/addseed', seedRoutes)
app.use('/removeseed/:id', seedRoutes)
app.use('/cart', require('./routes/cart'));
app.use('/addToCart', require('./routes/cart'))
// app.use('/cart', require('./routes/cart'))

// Start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
