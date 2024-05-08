import {Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Index from './pages/Index';
import Categoria from './pages/Categoria';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/nosotros" element={ <Contacto /> } />
        {/* Más rutas según sea necesario */}
      </Routes>
    </Layout>
  );
}

export default App;
