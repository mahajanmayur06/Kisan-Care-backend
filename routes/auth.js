const express = require('express');
const router = express.Router();
const authController = require('../controllers/authContoller')

router.post('/', authController.handleLogin);

module.exports = router;