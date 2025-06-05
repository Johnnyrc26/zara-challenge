import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CartProvider } from './store/context/cartProvider'
import { AuthProvider } from './store/context/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
)
