import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
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
import LoginPage from './pages/Login';
import PrivateRoute from './auth/PrivateRoute';
import ResultadoBusqueda from './pages/ResultadoBusqueda';


function App() {
  
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Index />} />
            <Route path="/categoria" element={<Categoria />} />
            <Route path="/nosotros" element={<Contacto />} />
            <Route path="/categoria/:id" element={<CategoriaDetalle />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<CartPage />} /> 
            <Route path="/resultadobusqueda" element={<ResultadoBusqueda />}/>
            <Route path="/commit" element={<PrivateRoute element={Commit} />} />
            <Route path="/commit_error" element={<PrivateRoute element={CommitError} />} />
            <Route path="/login" element={<LoginRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

function LoginRoute() {
  const { user } = useAuth();

  return user ? <Navigate to="/" replace /> : <LoginPage />;
}

export default App;
