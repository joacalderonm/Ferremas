import { useParams } from 'react-router-dom';
import { fetchProductoById } from '../api/apiProducto';
import { useState, useEffect } from 'react';

function ProductoDetalle() {
  const [producto, setProducto] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const productoData = await fetchProductoById(id);
        setProducto(productoData);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };
    obtenerProducto();
  }, [id]);

  return (
    <div>
      <h1>{producto.nombre}</h1>
      <img src={producto.imagen} alt={producto.nombre} />
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio_formateado}</p>
      <p>Marca: {producto.marca}</p>
      <p>Material: {producto.material}</p>
    </div>
  );
}

export default ProductoDetalle;
