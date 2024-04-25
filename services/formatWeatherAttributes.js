function formatWeatherData(data) {
    if (!data) return '';

    const { name, main, weather, wind, visibility, clouds } = data;
    const temperature = main && main.temp ? `${main.temp} K` : 'N/A';
    const pressure = main && main.pressure ? `${main.pressure} hPa` : 'N/A';
    const humidity = main && main.humidity ? `${main.humidity}%` : 'N/A';
    const description = weather && weather.length > 0 ? weather[0].description : 'N/A';
    const windSpeed = wind && wind.speed ? `${wind.speed} m/s` : 'N/A';
    const visibilityKm = visibility ? `${visibility / 1000} km` : 'N/A';
    const cloudiness = clouds && clouds.all ? `${clouds.all}%` : 'N/A';

    const text = `${name} has:\n` +
        `Temperature: ${temperature}, Pressure: ${pressure}, Humidity: ${humidity}\n` +
        `Weather: ${description}\n` +
        `Wind: ${windSpeed}, Visibility: ${visibilityKm}, Cloudiness: ${cloudiness}\n\n`;

    return text;
}

module.exports = formatWeatherData