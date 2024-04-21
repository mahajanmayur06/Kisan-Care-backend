const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_api_key);

exports.generateResponse = async (req, res) => {
    const { type } = req.body;
    // console.log('request 1');
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // console.log('request 2');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        res.send(text);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to generate content");
    }
};

