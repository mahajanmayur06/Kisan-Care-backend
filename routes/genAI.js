const express = require('express')
const router = express.Router()
const genAI = require('../services/genAI')

router.post('/generate',genAI.generateResponse)

module.exports = router;