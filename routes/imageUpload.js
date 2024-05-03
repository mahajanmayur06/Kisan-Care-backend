const express = require('express')
const imageController = require( '../controllers/imageController.js')
const multer = require('multer')
const storage = require('../config/multerOptions.js')


const upload = multer({ storage: storage })
const router = express.Router()

// router.post('/generateimageresponse', upload.single('image'))
router.post('/generateimageresponse', upload.single('image'), imageController)

module.exports = router
