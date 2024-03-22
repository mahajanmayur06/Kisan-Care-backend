const mongoose = require('mongoose');

const SeedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image : {
        type : String
    },
    price : {
        type : Number,
        required : true
    },
    distributer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin'
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {
        collection : 'seeds'
});

module.exports = mongoose.model('Seed', SeedSchema);
