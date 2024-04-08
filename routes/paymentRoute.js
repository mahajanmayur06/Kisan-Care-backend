const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')
const instance = require('../server')

router.post('/', paymentController.checkout)

module.exports = router