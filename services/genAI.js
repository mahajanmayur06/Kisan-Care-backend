const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_api_key);
const axios = require('axios')
const formatWeatherData = require('./formatWeatherAttributes');

exports.generateResponse = async (req, res) => {
    const { prompt } = req.body;
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    } catch (error) {
        console.log(error);
        res.status(500).send("Couldn't fullfil your request at this time.");
    }
};

exports.weatherResponse = async (req, res) => {
    const { seedName, date, location, type } = req.body
    try {
        const forecast = await axios.get('http://localhost:3500/weather-forecast', {
            params: {
                cityName: location
            }
        });
        const formattedResponse = formatWeatherData(forecast.data)

        const prompt = `These are the details given by weather forecast department in the region ${location}\n` +
            `${formattedResponse}` +
            `I have planted ${seedName} on ${date} in soil ${type}, what should be the frequency of irrigation?\n` +
            `Do I need to add fertilizers for healthy yield and which one to be added?\n` +
            `Suggest the companies in Indian market that manufacture them with the price and quantity?\n` +
            `What are the major threats from pests and which pesticides to be used?\n` +
            `Suggest the companies in Indian market that manufacture them with the price and quantity`;

        // Generate response using generative AI model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log(text);
        res.send(text);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Couldn't fullfil you request at this time");
    }
};


