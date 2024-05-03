const multer = require('multer')
const path = require('path')

const DESTINATION_PATH = "./images"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DESTINATION_PATH)
    },
    filename: (req, file, cb) => {
        try {
            const extname = path.extname(file.originalname)
            const filename = `${file.originalname}${extname}`
            cb(null, filename)
        } catch (error) {
            cb(error)
        }
    },
})

module.exports = storage