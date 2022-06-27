const express = require('express')
const {createItem,getItems,getItem,deleteItem,updateItem} = require('../controllers/storage')
const  router = express.Router()

const uploadMiddleware = require('../utils/handleStorage')
// obtener lista de items

router.post('/',uploadMiddleware.single("myfile"),createItem)
router.get('/',getItems);
router.get('/:id',getItem);
router.put('/:id',updateItem)
router.delete('/:id',deleteItem)

module.exports = router