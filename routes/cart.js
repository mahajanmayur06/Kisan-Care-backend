const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.getCart)
// POST request to add an item to the user's cart
// router.post('/:username/add', cartController.addToCart);
router.post('/', cartController.addToCart);

// GET request to retrieve the user's cart
// router.get('/:username/cart', cartController.getCart);

module.exports = router;
