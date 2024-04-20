const express = require('express')
const router = express.Router()
const wishListController = require('../controllers/wishListController')

router.post('/addToWishlist', wishListController.addToWishlist)
router.get('/getWishlist', wishListController.getWishlist)
router.delete('/removeWishlist', wishListController.deleteFromWishlist)
router.delete('/clearWishlist', wishListController.clearWishList)

module.exports = router