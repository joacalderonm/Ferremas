import {Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Index from './pages/Index';
import Categoria from './pages/Categoria';
import Contacto from './pages/Contacto';
import CategoriaDetalle from './pages/CategoriaDetalle';
import CartPage from './pages/CartPage';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/nosotros" element={<Contacto />} />
          <Route path="/categoria/:id" element={<CategoriaDetalle />} />
          <Route path="/carrito" element={<CartPage />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;