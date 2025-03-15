import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/PhoneListHome'
import DetailPage from './pages/PhoneDetail'
import CartView from './pages/CartView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/phone/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
