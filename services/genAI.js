const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_api_key);
const axios = require('axios')
const formatWeatherData = require('./formatWeatherAttributes');

const fetch = require('node-fetch');

const encodedParams = new URLSearchParams();

const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': process.env.TRANSLATE_api_key,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    body: encodedParams
};

const translateToHindi = async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log('Translated to hindi')
        console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }
}


exports.generateResponse = async (req, res) => {
    const { prompt } = req.body;
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // const newPrompt = prompt + "\nIf above query is not regarding agriculture, farming, farmers, then give response as 'Could not provide service'"
        const newPrompt = prompt + "\nPlease give response in hindi language barrier."
        const result = await model.generateContent(newPrompt);
        const response = await result.response;
        const text = response.text();
        console.log('Text generated');
        res.send(text);
    } catch (error) {
        console.log(error);
        res.status(500).send("Couldn't fullfil your request at this time.");
    }
};

exports.weatherResponse = async (req, res) => {
    const { seedName, date, location, type } = req.body
    if (!seedName || !date) {
        return 'Seed name and date not selected'
    }
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
            `Suggest the companies in Indian market that manufacture them with the price and quantity` + 
            `\nPlease give this response in Hindi language barrier.`

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


exports.getSoilType = async (req, res) => {
    const { location } = req.body;
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `What is the type of soil found in following location:` + 
        `City : ${location}` + 
        `Country : India` +
        `I want the resonse in only one word to pass the soil type to call api`
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text)
    } catch (error) {
        console.log(error);
        res.status(500).send("Couldn't fullfil your request at this time.");
    }
};

