const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.post('/order', orderController.placeOrder)
router.post('/verifyorder', orderController.verifyOrder)
router.get('/userorders', orderController.userOrders)
router.post('/status', orderController.updateStatus)

module.exports = router
