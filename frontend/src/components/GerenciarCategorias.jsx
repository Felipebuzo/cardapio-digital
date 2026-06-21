import { useEffect, useState } from 'react'
import api from '../services/api'

function GerenciarCategorias() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (err) {
      setError('Erro ao carregar categorias.')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, { name })
      } else {
        await api.post('/categories', { name })
      }

      setName('')
      setEditingId(null)
      loadCategories()
    } catch (err) {
      setError('Erro ao salvar categoria.')
    }
  }

  function handleEdit(category) {
    setName(category.name)
    setEditingId(category.id)
  }

  function handleCancelEdit() {
    setName('')
    setEditingId(null)
  }

  async function handleDelete(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta categoria?')
    if (!confirmar) return

    try {
      await api.delete(`/categories/${id}`)
      loadCategories()
    } catch (err) {
      setError('Erro ao excluir categoria.')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-orange-700 mb-4">Categorias</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-700 transition"
        >
          {editingId ? 'Salvar' : 'Adicionar'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
        )}
      </form>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <ul className="flex flex-col gap-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between items-center bg-orange-50 rounded-lg px-4 py-2"
          >
            <span className="text-gray-800">{category.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="text-orange-600 font-medium text-sm hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-600 font-medium text-sm hover:underline"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GerenciarCategorias