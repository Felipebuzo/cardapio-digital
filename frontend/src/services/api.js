import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'http://localhost:3333/api'
})

// Antes de cada requisição, adiciona o token automaticamente (se existir)
api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api