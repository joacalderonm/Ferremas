import propTypes from 'prop-types';
import { useCart } from '../components/CartContext';
import { useState } from 'react';
import Modal from './Modal';

const Producto = ({ categoria, productos, marcas, materiales }) => {
  const { dispatch } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (producto) => {
    dispatch({ type: 'ADD_TO_CART', product: producto });
  };

  const handleClick = (producto) => {
    setSelectedProduct(producto);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-10">{categoria.nombre}</h2>
      <h3 className="text-xl font-semibold mb-4">Productos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.productoID} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                <img className="max-w-full max-h-full object-contain" src={producto.imagen} alt={producto.nombre} />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold">{producto.nombre}</h4>
                <p className="text-gray-700 mt-2 flex-grow">{producto.descripcion}</p>
                <div className="mt-4">
                  <p className="text-black-600 font-bold">Precio: {producto.precio_formateado}</p>
                  {producto.stock === 0 ? (
                    <p className="text-red-600 mt-2">Producto sin stock</p>
                  ) : (
                    <p className="text-black-600 font-bold mt-2">Stock: {producto.stock}</p>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    className={`w-full py-2 px-4 rounded ${
                      producto.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
                    } font-semibold`}
                    onClick={() => handleAddToCart(producto)}
                    disabled={producto.stock === 0}
                  >
                    Añadir al Carrito
                  </button>
                  <button
                    className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
                    onClick={() => handleClick(producto)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles para esta categoría.</p>
        )}
      </div>
      {selectedProduct && (
        <Modal
          producto={selectedProduct}
          closeModal={closeModal}
          marcas={marcas}
          materiales={materiales}
        />
      )}
    </div>
  );
};

Producto.propTypes = {
  categoria: propTypes.shape({
    nombre: propTypes.string.isRequired,
  }).isRequired,
  productos: propTypes.arrayOf(
    propTypes.shape({
      productoID: propTypes.number.isRequired,
      nombre: propTypes.string.isRequired,
      descripcion: propTypes.string.isRequired,
      imagen: propTypes.string.isRequired,
      precio: propTypes.number.isRequired,
      precio_formateado: propTypes.string.isRequired,
    })
  ).isRequired,
  marcas: propTypes.arrayOf(
    propTypes.shape({
      marcaID: propTypes.number.isRequired,
      nombre: propTypes.string.isRequired,
    })
  ).isRequired,
  materiales: propTypes.arrayOf(
    propTypes.shape({
      materialID: propTypes.number.isRequired,
      nombre: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default Producto;
