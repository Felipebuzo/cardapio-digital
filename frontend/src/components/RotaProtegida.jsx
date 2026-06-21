import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/auth'

function RotaProtegida({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" />
  }

  return children
}

export default RotaProtegida