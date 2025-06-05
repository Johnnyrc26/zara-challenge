import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/PhoneListHome'
import DetailPage from './pages/PhoneDetail'
import CartView from './pages/CartView'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/phone/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
