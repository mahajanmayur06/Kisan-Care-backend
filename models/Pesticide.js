const mongoose = require('mongoose');

const pesticideSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    weight: {type : Number, default : 1},
    disc: { type: String, required: true },
    image: { type: String }
});

const Pesticide = mongoose.model('Pesticide', pesticideSchema);

module.exports = Pesticide ;
