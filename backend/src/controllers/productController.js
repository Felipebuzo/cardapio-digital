const prisma = require('../config/prisma')

// Listar todos os produtos
async function index(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })
    return res.json(products)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message, error.stack)
    return res.status(500).json({ error: 'Erro ao buscar produtos.' })
  }
}

// Listar produtos por categoria
async function getByCategory(req, res) {
  try {
    const { categoryId } = req.params
    const products = await prisma.product.findMany({
      where: { categoryId: Number(categoryId), available: true },
      include: { category: true },
      orderBy: { name: 'asc' }
    })
    return res.json(products)
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error.message, error.stack)
    return res.status(500).json({ error: 'Erro ao buscar produtos.' })
  }
}

// Criar produto
async function create(req, res) {
  try {
   
    const { name, description, price, categoryId } = req.body
    // Com o Cloudinary, req.file.path já vem com a URL completa da imagem
    const image = req.file ? req.file.path : null

    if (!name || !price || !categoryId) {
      return res.status(400).json({ error: 'Nome, preço e categoria são obrigatórios.' })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId: Number(categoryId)
      }
    })

    return res.status(201).json(product)
  } catch (error) {
    console.error('Erro ao criar produto:', error.message, error.stack)
    return res.status(500).json({ error: 'Erro ao criar produto.' })
  }
}

// Atualizar produto
async function update(req, res) {
  try {
    const { id } = req.params
    const { name, description, price, categoryId, available } = req.body
    // Com o Cloudinary, req.file.path já vem com a URL completa da imagem
    const image = req.file ? req.file.path : undefined

    const data = {
      name,
      description,
      price: price ? parseFloat(price) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      available: available !== undefined ? available === 'true' : undefined
    }

    // Remove campos indefinidos para não sobrescrever com undefined
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key])

    if (image) data.image = image

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data
    })

    return res.json(product)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message, error.stack)
    return res.status(500).json({ error: 'Erro ao atualizar produto.' })
  }
}

// Deletar produto
async function remove(req, res) {
  try {
    const { id } = req.params

    await prisma.product.delete({
      where: { id: Number(id) }
    })

    return res.status(204).send()
  } catch (error) {
    console.error('Erro ao deletar produto:', error.message, error.stack)
    return res.status(500).json({ error: 'Erro ao deletar produto.' })
  }
}

module.exports = { index, getByCategory, create, update, remove }