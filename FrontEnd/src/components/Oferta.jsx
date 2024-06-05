import React, { useState, useEffect } from 'react';
import { fetchRandomProductos } from '../api/apiProducto'; // Importa la nueva función
import ProductoCard from './ProductoCard'; // Componente para mostrar cada producto

const Oferta = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosData = await fetchRandomProductos(); // Usa la nueva función
        const productosMayus = productosData.map((producto) => ({
          ...producto,
          nombre: producto.nombre.toUpperCase(),
          precio: parseFloat(producto.precio),
          precio_formateado: parseFloat(producto.precio).toLocaleString('de-DE', { style: 'currency', currency: 'CLP' }),
        }));
        setProductos(productosMayus);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setError('No se pudieron cargar los productos');
      }
    };

    obtenerProductos();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (productos.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container  p-1 px-3 lg:px-1">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-1">
        {productos.map((producto) => (
          <ProductoCard key={producto.productoID} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Oferta;
