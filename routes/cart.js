const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST request to add an item to the user's cart
// router.post('/:username/add', cartController.addToCart);
router.post('/', cartController.addToCart);

// GET request to retrieve the user's cart
// router.get('/:username/cart', cartController.getCart);
router.get('/', cartController.getCart)

module.exports = router;
