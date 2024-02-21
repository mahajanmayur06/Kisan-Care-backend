const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Seed' // Reference to the Seed model
    }]
}, {
    collection : 'users'
});

module.exports = mongoose.model('User', userSchema);
