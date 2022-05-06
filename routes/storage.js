const express = require('express')
const {createItem,getItems,getItem,deleteItem,updateItem} = require('../controllers/storage')
const  router = express.Router()
const {validatorGetItem} = require('../validators/tracks')
const uploadMiddleware = require('../utils/handleStorage')
// obtener lista de items

router.post('/',uploadMiddleware.single("myfile"),createItem)
router.get('/',getItems);
router.get('/:id',validatorGetItem,getItem);
router.put('/:id',validatorGetItem,updateItem)
router.delete('/:id',validatorGetItem,deleteItem)

module.exports = router