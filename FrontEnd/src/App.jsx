import {Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Index from './pages/Index';
import Categoria from './pages/Categoria';
import Contacto from './pages/Contacto';
import CategoriaDetalle from './pages/CategoriaDetalle';
import Prueba from './pages/prueba';
import Commit from './pages/Commit';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/nosotros" element={ <Contacto /> } />
        <Route path="/categoria/:id" element={<CategoriaDetalle />} />
        <Route path="/prueba" element={ <Prueba /> } />
        <Route path='/commit' element={ <Commit /> } />
        {/* Más rutas según sea necesario */}
      </Routes>
    </Layout>
  );
}

export default App;
