const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const gemini = new GoogleGenerativeAI(process.env.GEMINI_api_key);

const PROMPT = (
    "On the first line give whether the plant is healthy or not and then give the name and short description about the condition" +
    "of the plant in the provided image. Give the answer in points with each point on a new line and do not use '*' anywhere " +
    "Provide its health and whether there's a problem with the plant in the provided image. if yes tell the problem of the plant health along with the solution including the fertilizers/pesticides to be used and special care to be taken" +
    "Respond with 'Couldn\'t process the request... Ask related to farming.' if the image is not related to farming."+
    `\nPlease give this response in Hindi language barrier.` 
);

function fileToGenerativePart(filePath, mimeType) {
    if (!filePath) {
        throw new Error('File path is undefined or null.');
    }

    const fullPath = path.join(__dirname, '..', 'images', filePath); 

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

        const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
