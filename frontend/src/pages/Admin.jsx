import { useNavigate } from 'react-router-dom'
import { removeToken } from '../services/auth'
import GerenciarCategorias from '../components/GerenciarCategorias'
import GerenciarProdutos from '../components/GerenciarProdutos'

function Admin() {
  const navigate = useNavigate()

  function handleLogout() {
    removeToken()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-orange-600 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-orange-100 transition"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
        <GerenciarCategorias />
        <GerenciarProdutos />
      </main>
    </div>
  )
}

export default Admin