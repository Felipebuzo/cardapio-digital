require('dotenv/config')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express()

// Segurança
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}))
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Rate limiting — máximo 100 requisições por 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Muitas requisições, tente novamente mais tarde.' }
})
app.use(limiter)

// Parse JSON
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/uploads', express.static('src/uploads'))

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Cardápio Digital funcionando! 🍕' })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})