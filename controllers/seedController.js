const Seed = require('../models/Seed');

exports.getAllSeeds = async (req, res) => {
    try {
        const seeds = await Seed.find();
        res.json(seeds);
    } catch (error) {
        res.status(500).json({ 'message' : 'Cant find Seeds' });
    }
};

exports.getSeed = async (req, res) => {
    try {
        const { name, type } = req.query;
        const seed = await Seed.findOne({ name, type });        
        console.log(`${seed.name} is fetched`);
        if (!seed) {
            return res.status(404).json({ 'message': 'Seed not found' });
        }
        res.status(200).json(seed);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ 'message': error.message });
    }
};

exports.addSeed = async (req, res) => {
    try {
        // const distributer = await Admin.findOne({ username: req.body.distributer });
        // if (!distributer) {
        //     res.status(404).json({ message: 'Distributor not found' });
        // }    
        const seed = new Seed({
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,
            price : req.body.price,
            // distributer : distributer._id
        });
        const newSeed = await seed.save();
        console.log(`${newSeed} is added to db`);
        res.status(201).json(newSeed);
    } catch (error) {
        res.status(400).json({ 'message': error.message });
    }
};

exports.removeSeed = async (req, res) => {
    try {
        const removedSeed = await Seed.deleteOne({ id: req.params.id });
        console.log(`${removedSeed} removed`);
        res.json({ message: 'Seed removed', removedSeed });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
};

exports.getSeed = async (req, res) => {
    const { seedType } = req.query
    try {
        const seeds = await Seed.find({ type : seedType})
        
    }
    catch(err) {
        console.log(err.message);
        res.status(500).json({message : err.message})
    }
}