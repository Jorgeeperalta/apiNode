const express = require('express')
const customHeader = require('../middleware/customHeader')
const router = express.Router()
const {validatorCreateItem} = require('../validators/tracks')
const {getItems,getItem,createItem,updateItem,deleteItem} = require('../controllers/tracks')

router.get('/:id',getItem)
router.get('/',getItems)
router.get('/',updateItem)
router.post('/',validatorCreateItem,createItem)
router.get('/:id',deleteItem)
module.exports = router