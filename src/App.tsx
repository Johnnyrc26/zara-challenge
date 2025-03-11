import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/PhoneListHome'
import DetailPage from './pages/PhoneDetail'
import CartView from './pages/CartView';
// import { CartProvider } from './context/CartContext';
// import './assets/styles/global.css';

function App() {
  return (
    <BrowserRouter>
      {/* <CartProvider> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/phone/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartView />} />
        </Route>
      </Routes>
      {/* </CartProvider> */}
    </BrowserRouter>
  )
}

export default App
