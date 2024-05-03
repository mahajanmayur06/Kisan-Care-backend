const express = require('express')
const router = express.Router()
const weatherData = require('../services/weather')

router.get('/weather-forecast', weatherData.getWeatherData )

module.exports = router