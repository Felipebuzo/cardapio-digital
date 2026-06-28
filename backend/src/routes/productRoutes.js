const express = require('express')
const { index, getByCategory, create, update, remove } = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', index)
router.get('/category/:categoryId', getByCategory)
router.post('/', authMiddleware, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router