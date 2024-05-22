import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategoriaById, fetchProductosPorCategoria } from '../api/api.js'; // Asegúrate de importar la nueva función

const CategoriaDetalle = () => {
  const { id } = useParams(); // Suponiendo que el parámetro en la URL es el nombre de la categoría
  const [categoria, setCategoria] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCategoriaYProductos = async () => {
      try {
        console.log('ID de la categoría a buscar:', id); 
        const categoriaData = await fetchCategoriaById(id);
        setCategoria(categoriaData);
        
        const productosData = await fetchProductosPorCategoria(categoriaData.categoriaID);
        setProductos(productosData);
      } catch (error) {
        console.error('Error al cargar los detalles de la categoría y los productos:', error);
        setError('No se pudieron cargar los detalles de la categoría y los productos');
      }
    };

    obtenerCategoriaYProductos();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!categoria) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{categoria.nombre}</h2>
      <h3 className="text-xl font-semibold mb-2">Productos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.productoID} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-48 object-cover" src={producto.imagen} alt={producto.nombre} />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{producto.nombre}</h4>
                <p className="text-gray-700 mt-2">{producto.descripcion}</p>
                <p className="text-blue-600 font-bold mt-4">Precio: ${producto.precio_formateado}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No hay productos disponibles para esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriaDetalle;
