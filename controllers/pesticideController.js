const Pesticide = require('../models/Pesticide');

exports.addPesticide = async (req, res) => {
    try {
        const { name, price, weight, disc, image } = req.body;
        const newPesticide = new Pesticide({
            name,
            price,
            weight,
            disc,
            image
        });
        const savedPesticide = await newPesticide.save();
        res.status(201).json(savedPesticide);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to add pesticide' });
    }
};

exports.getAllPesticides = async (req, res) => {
    try {
        const pesticides = await Pesticide.find();
        res.status(200).json(pesticides);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to get pesticides' });
    }
};

exports.getPesticidesByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        if (!minPrice || !maxPrice) {
            return res.status(400).json({ error: 'Min and max price parameters are required' });
        }

        const pesticides = await Pesticide.find({
            pestPrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
        });

        res.status(200).json(pesticides);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to get pesticides by price range' });
    }
};
