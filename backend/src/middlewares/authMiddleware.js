const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' })
  }

  // O header vem assim: "Bearer eyJhbGc..."
  // Precisamos separar e pegar só o token
  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' })
  }
}

module.exports = authMiddleware