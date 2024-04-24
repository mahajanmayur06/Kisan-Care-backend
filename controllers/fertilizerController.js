const Fertilizer = require('../models/Fertilizer');

exports.addFertilizer = async (req, res) => {
    try {
        const { name, price, weight, disc, image } = req.body;
        const newFertilizer = new Fertilizer({
            name,
            price,
            weight,
            disc,
            image
        });
        const savedFertilizer = await newFertilizer.save();
        console.log('fertilizer added');
        res.status(201).json(savedFertilizer);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to add fertilizer' });
    }
};

exports.getAllFertilizers = async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find();
        res.status(200).json(fertilizers);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to get fertilizers' });
    }
};