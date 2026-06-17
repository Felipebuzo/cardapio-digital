const express = require('express')
const { index, create, update, remove } = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', index)
router.post('/', authMiddleware, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router