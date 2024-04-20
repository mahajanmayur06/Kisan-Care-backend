const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/getCart', cartController.getCart)
router.post('/addToCart', cartController.addToCart)
router.delete('/clearCart', cartController.clearCart)

// POST request to add an item to the user's cart
// router.post('/:username/add', cartController.addToCart);

// GET request to retrieve the user's cart
// router.get('/:username/cart', cartController.getCart);

module.exports = router;
