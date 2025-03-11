import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY,
    'Content-Type': 'application/json',
  },
})

export default apiClient