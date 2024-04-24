const express = require('express');
const router = express.Router();
const fertilizerController = require('../controllers/fertilizerController')

router.get('/getAllFertilizers', fertilizerController.getAllFertilizers)
router.post('/addFertilizer', fertilizerController.addFertilizer)

module.exports = router;