import { useEffect, useState } from 'react'
import api from '../services/api'

function GerenciarProdutos() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  async function loadProducts() {
    try {
      const response = await api.get('/products')
      setProducts(response.data)
    } catch (err) {
      setError('Erro ao carregar produtos.')
    }
  }

  async function loadCategories() {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (err) {
      setError('Erro ao carregar categorias.')
    }
  }

  function clearForm() {
    setName('')
    setDescription('')
    setPrice('')
    setCategoryId('')
    setImage(null)
    setEditingId(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('categoryId', categoryId)
    if (image) {
      formData.append('image', image)
    }

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData)
      } else {
        await api.post('/products', formData)
      }

      clearForm()
      loadProducts()
    } catch (err) {
      setError('Erro ao salvar produto.')
    }
  }

  function handleEdit(product) {
    setName(product.name)
    setDescription(product.description || '')
    setPrice(product.price)
    setCategoryId(product.categoryId)
    setEditingId(product.id)
  }

  async function handleDelete(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este produto?')
    if (!confirmar) return

    try {
      await api.delete(`/products/${id}`)
      loadProducts()
    } catch (err) {
      setError('Erro ao excluir produto.')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-orange-700 mb-4">Produtos</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex gap-3">
          <input
            type="number"
            step="0.01"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Selecione a categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setImage(e.target.files[0])}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            {editingId ? 'Salvar alterações' : 'Adicionar produto'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center bg-orange-50 rounded-lg px-4 py-3"
          >
            <div>
              <p className="font-semibold text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">
                R$ {Number(product.price).toFixed(2)} — {product.category?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-orange-600 font-medium text-sm hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 font-medium text-sm hover:underline"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GerenciarProdutos