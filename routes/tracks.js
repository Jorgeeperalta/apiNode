const express = require('express')
const customHeader = require('../middleware/customHeader')
const router = express.Router()
const authMiddleware = require('../middleware/session')
const checkRol= require('../middleware/rol')
const {validatorCreateItem,validatorGetItem} = require('../validators/tracks')
const {getItems,getItem,createItem,updateItem,deleteItem} = require('../controllers/tracks')

router.get('/:id',authMiddleware,validatorGetItem,getItem)
router.get('/',authMiddleware,getItems)
router.put('/:id',authMiddleware,validatorGetItem,validatorCreateItem,updateItem)
router.post('/',authMiddleware,checkRol(["admin"]),validatorCreateItem,createItem)
router.delete('/:id',authMiddleware,validatorGetItem,deleteItem)
module.exports = router