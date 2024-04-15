const express = require('express');
const router = express.Router();
const authController = require('../controllers/authContoller')

router.get('/', authController.handleLogin);

module.exports = router;