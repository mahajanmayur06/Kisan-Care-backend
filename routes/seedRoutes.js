const express = require('express');
const router = express.Router();
const { getAllSeeds, getSeed, addSeed, removeSeed } = require('../controllers/seedController');

router.get('/', getAllSeeds);
router.get('/', getSeed);
router.post('/', addSeed);
router.delete('/', removeSeed);

router.get('/getAllSeeds', getAllSeeds)
router.get('/seed/:id', getSeed)
router.post('/addseed', addSeed)
router.delete('/removeseed/:id', removeSeed)

module.exports = router;