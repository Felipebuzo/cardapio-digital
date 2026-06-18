const multer = require('multer')
const path = require('path')

// Configuração de onde e como salvar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, '..', 'uploads'))
  },
  filename: (req, file, callback) => {
    // Gera um nome único pra evitar arquivos com o mesmo nome se sobrescreverem
    const uniqueName = `${Date.now()}-${file.originalname}`
    callback(null, uniqueName)
  }
})

// Filtro para aceitar só imagens
const fileFilter = (req, file, callback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true)
  } else {
    callback(new Error('Tipo de arquivo não permitido. Envie apenas JPEG, PNG ou WEBP.'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB no máximo
  }
})

module.exports = upload