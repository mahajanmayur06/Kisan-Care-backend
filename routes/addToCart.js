const express = require('express')
const router = express.Router()
const addToCartController = require('../controllers/addToCartController')

router.post('/', addToCartController.addToCart);

module.exports = router;