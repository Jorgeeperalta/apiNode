const express = require('express')
const {createItem}= require('../controllers/storage')
const  router = express.Router()

const uploadMiddleware = require('../utils/handleStorage')


router.post('/',uploadMiddleware.single("myfile"),createItem)


module.exports = router