const axios = require('axios')

exports.getWeatherData = async (req, res) => {
    const cityName = req.query.cityName;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_api_key}`;

    try {
        const response = await axios.get(URL);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return res.status(500).json({ message: 'Error fetching weather data' });
    }
}