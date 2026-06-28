import { useEffect, useState } from 'react'
import api from '../services/api'

function Cardapio() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products')
        ])
        setCategories(categoriesRes.data)
        setProducts(productsRes.data)
      } catch (error) {
        console.error('Erro ao carregar cardápio:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  function scrollToCategory(categoryId) {
    const element = document.getElementById(`categoria-${categoryId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-orange-600 text-xl font-semibold">Carregando cardápio...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-orange-600 sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-white text-3xl font-bold text-center">
            Cardápio Digital
          </h1>
        </div>

        {/* Navegação de categorias */}
        <nav className="bg-orange-700 overflow-x-auto">
          <div className="max-w-5xl mx-auto px-4 flex gap-3 py-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="whitespace-nowrap bg-white text-orange-700 font-semibold px-4 py-2 rounded-full text-sm hover:bg-orange-100 transition"
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Conteúdo */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.categoryId === category.id
          )

          if (categoryProducts.length === 0) return null

          return (
            <section
              key={category.id}
              id={`categoria-${category.id}`}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-orange-800 mb-4 border-b-2 border-orange-300 pb-2">
                {category.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-500 text-sm mt-1">
                          {product.description}
                        </p>
                      )}
                      <span className="inline-block mt-3 bg-orange-600 text-white font-semibold px-3 py-1 rounded-full text-sm">
                        R$ {Number(product.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}

export default Cardapio