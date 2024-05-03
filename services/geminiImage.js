const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const gemini = new GoogleGenerativeAI(process.env.GEMINI_api_key);

const PROMPT = (
    "Please provide the name of crop/seed/leaf or anything related to farming " +
    "of the provided image. Include information related to it. " +
    "Provide its state and whether there's a problem with the image provided. " +
    "Give a solution in 70 to 80 words only. " +
    "Respond with 'Couldn\'t process the request... Ask related to farming.' if the image is not related to farming."
);

function fileToGenerativePart(filePath, mimeType) {
    if (!filePath) {
        throw new Error('File path is undefined or null.');
    }

    const fullPath = path.join(__dirname, '..', 'images', filePath); // Adjust path as needed

    // Check if fullPath is a directory
    const isDirectory = fs.statSync(fullPath).isDirectory();
    if (isDirectory) {
        throw new Error(`The path "${fullPath}" points to a directory, not a file.`);
    }

    const data = fs.readFileSync(fullPath);
    return {
        inlineData: {
            data: Buffer.from(data).toString('base64'),
            mimeType,
        },
    };
}

const geminiImageBot = async (req, file) => {
    try {
        if (!file) {
            throw new Error('File is undefined or null.');
        }

        const imageParts = [fileToGenerativePart(file.filename, file.mimetype)];

        const model = gemini.getGenerativeModel({ model: 'gemini-pro-vision' });

        const result = await model.generateContent([PROMPT, ...imageParts]);
        const response = result.response;
        const text = response.text();

        return text;
    } catch (err) {
        console.error('Gemini request failed: ', err);
        return "Sorry, we couldn't process your request at the moment. Please try again later.";
    }
};

module.exports = geminiImageBot;
