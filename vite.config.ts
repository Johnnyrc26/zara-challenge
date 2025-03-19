import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/images': {
        target: 'http://prueba-tecnica-api-tienda-moviles.onrender.com',
        changeOrigin: true,  // Cambia el origen de la solicitud para evitar CORS
        rewrite: (path) => path.replace(/^\/images/, ''),  // Reescribe el prefijo para la URL
      },
    },
  },
})