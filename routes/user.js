const express = require('express');
const router = express.Router();
const authController = require('../controllers/authContoller')
const registerController = require('../controllers/registerController');
const addressController = require('../controllers/addressController')
// const 

router.get('/auth', authController.handleLogin);
router.post('/register', registerController.handleNewUser);
router.post('/addaddress', addressController.addAddress)

module.exports = router;