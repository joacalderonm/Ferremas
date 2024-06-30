import {Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Index from './pages/Index';
import Categoria from './pages/Categoria';
import Contacto from './pages/Contacto';
import CategoriaDetalle from './pages/CategoriaDetalle';
import ProductoDetalle from './pages/ProductoDetalle';
import Commit from './pages/Commit';
import CartPage from './pages/CartPage';
import { CartProvider } from './components/CartContext';
import CommitError from './pages/CommitError';
import NotFound from './components/layout/NotFound';

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/nosotros" element={<Contacto />} />
          <Route path="/categoria/:id" element={<CategoriaDetalle />} />
          <Route path="/producto/:id" element={< ProductoDetalle/>} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path='/commit' element={ <Commit /> } />
          <Route path="/commit_error" element={<CommitError />} />
          <Route path="*" element={<NotFound />} />
            {/* Más rutas según sea necesario */}
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;