const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
    ferName: { type: String, required: true },
    ferType: { type: String, required: true },
    ferPrice: { type: Number, required: true },
    ferDescription: { type: String, required: true },
    ferImageUrl: { type: String },
});

const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);

module.exports = Fertilizer;
