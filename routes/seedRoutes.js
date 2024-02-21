const express = require('express');
const router = express.Router();
const { getAllSeeds, getSeed, addSeed, removeSeed } = require('../controllers/seedController');

router.get('/', getAllSeeds);
router.get('/', getSeed);
router.post('/', addSeed);
router.delete('/', removeSeed);

module.exports = router;