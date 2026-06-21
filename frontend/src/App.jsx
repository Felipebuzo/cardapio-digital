import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cardapio from './pages/Cardapio'
import Login from './pages/Login'
import Admin from './pages/Admin'
import RotaProtegida from './components/RotaProtegida'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RotaProtegida>
              <Admin />
            </RotaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App