const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinary')

// Configuração de onde salvar os arquivos (agora no Cloudinary, não no disco)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'cardapio-digital', // pasta dentro do Cloudinary onde as imagens ficam organizadas
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
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