const Seed = require('../models/Seed');

exports.getAllSeeds = async (req, res) => {
    try {
        const seeds = await Seed.find();
        res.json(seeds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSeed = async (req, res) => {
    try {
        const seed = await Seed.findOne({ id: req.params.id });
        if (!seed) {
            return res.status(404).json({ message: 'Seed not found' });
        }
        res.json(seed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addSeed = async (req, res) => {
    const seed = new Seed({
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
    });

    try {
        const newSeed = await seed.save();
        console.log(`${newSeed} is added`);
        res.status(201).json(newSeed);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeSeed = async (req, res) => {
    try {
        const removedSeed = await Seed.deleteOne({ id: req.params.id });
        console.log(`${removedSeed} removed`);
        res.json({ message: 'Seed removed', removedSeed });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
