const express = require('express');
const router = express.Router();
const { getAllSeeds, getSeed, addSeed, removeSeed } = require('../controllers/seedController');

router.get('/getAllSeeds', getAllSeeds)
router.get('/seed', getSeed)
router.post('/addseed', addSeed)
router.delete('/removeseed/:id', removeSeed)

module.exports = router;