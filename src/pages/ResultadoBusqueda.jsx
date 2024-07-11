import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProductos } from '../api/apiProducto'; // Asegúrate de tener esta función para obtener productos
import Producto from '../components/Producto';


const ResultadoBusqueda = ({ marcas, materiales }) => {
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';

    const obtenerProductos = async () => {
      setLoading(true);
      try {
        const resultado = await fetchProductos(query);
        setProductos(resultado);
      } catch (error) {
        console.error('Error al buscar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [location]);

  return (
    <div className="container  mx-auto p-2 md:flex md:space-x-2">
     
    <div>
      <h1 className="text-2xl font-bold text-center mb-30"></h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Producto
          categoria={{ nombre: 'Resultados de la búsqueda' }}
          productos={productos}
          marcas={marcas}
          materiales={materiales}
        />
      )}
    </div>
    </div>
    
  );
};

export default ResultadoBusqueda;
