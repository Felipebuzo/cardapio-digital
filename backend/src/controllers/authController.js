const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

// Função de cadastro do admin
async function register(req, res) {
  try {
    const { name, email, password } = req.body

    // Verifica se já existe um usuário com esse email
    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado.' })
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao cadastrar usuário.' })
  }
}


// Função de login
async function login(req, res) {
  try {
    const { email, password } = req.body

    // Busca o usuário pelo email
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: 'Email ou senha inválidos.' })
    }

    // Compara a senha digitada com a senha criptografada do banco
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Email ou senha inválidos.' })
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer login.' })
  }
}

module.exports = { register, login }