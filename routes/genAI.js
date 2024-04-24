const express = require('express')
const router = express.Router()
const genAI = require('../services/genAI')

router.post('/generate', genAI.generateResponse)
router.post('/weatherResponse', genAI.weatherResponse)

module.exports = router;