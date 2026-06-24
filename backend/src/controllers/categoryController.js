const prisma = require('../config/prisma')

// Listar todas as categorias
async function index(req, res) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
    return res.json(categories)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return res.status(500).json({ error: 'Erro ao buscar categorias.' })
  }
}

// Criar uma nova categoria
async function create(req, res) {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'O nome da categoria é obrigatório.' })
    }

    const category = await prisma.category.create({
      data: { name }
    })

    return res.status(201).json(category)
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    return res.status(500).json({ error: 'Erro ao criar categoria.' })
  }
}

// Atualizar uma categoria existente
async function update(req, res) {
  try {
    const { id } = req.params
    const { name } = req.body

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name }
    })

    return res.json(category)
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error)
    return res.status(500).json({ error: 'Erro ao atualizar categoria.' })
  }
}

// Deletar uma categoria
async function remove(req, res) {
  try {
    const { id } = req.params

    await prisma.category.delete({
      where: { id: Number(id) }
    })

    return res.status(204).send()
  } catch (error) {
    console.error('Erro ao deletar categoria:', error)
    return res.status(500).json({ error: 'Erro ao deletar categoria.' })
  }
}

module.exports = { index, create, update, remove }