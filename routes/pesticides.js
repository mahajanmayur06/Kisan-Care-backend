const express = require('express');
const router = express.Router();
const pesticideController = require('../controllers/pesticideController')

router.get('/getAllPesticides', pesticideController.getAllPesticides)
router.post('/addPesticide', pesticideController.addPesticide)

module.exports = router;