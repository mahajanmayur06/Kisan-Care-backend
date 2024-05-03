const geminiImageBot = require("../services/geminiImage")

const handleUpload = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) return res.status(400).send('No file uploaded.')
        console.log(req.file);
        const response = await geminiImageBot(req, req.file);
        console.log(response); 
        res.status(200).json(response);
    } catch (error) {
        console.error('Error processing file: ', error);
        res.status(500).send('Error processing file.');
    }
}


module.exports = handleUpload