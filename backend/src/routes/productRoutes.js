const express = require('express')
const { index, getByCategory, create, update, remove } = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../config/multer')

const router = express.Router()

router.get('/', index)
router.get('/category/:categoryId', getByCategory)
router.post('/', authMiddleware, upload.single('image'), create)
router.put('/:id', authMiddleware, upload.single('image'), update)
router.delete('/:id', authMiddleware, remove)

module.exports = router