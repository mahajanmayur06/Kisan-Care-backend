const express = require('express');
const router = express.Router();
const authController = require('../controllers/authContoller')
const registerController = require('../controllers/registerController');

router.get('/auth', authController.handleLogin);
router.post('/register', registerController.handleNewUser);

module.exports = router;