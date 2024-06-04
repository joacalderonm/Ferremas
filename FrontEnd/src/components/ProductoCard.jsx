import React from 'react';
import propTypes from 'prop-types';
import { useCart } from './CartContext';

const ProductoCard = ({ producto }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (producto) => {
    dispatch({ type: 'ADD_TO_CART', product: producto });
  };

  return (
    <div key={producto.productoID} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-48 flex items-center justify-center">
        <img className="max-w-full max-h-full object-contain" src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold">{producto.nombre}</h4>
        <p className="text-gray-700 mt-2">{producto.descripcion}</p>
        <p className="text-blue-600 font-bold mt-4">
          {producto.descuento ? (
            <>
              Precio con descuento: ${producto.precio_con_descuento}
            </>
          ) : (
            <>
              Precio: ${producto.precio_formateado}
            </>
          )}
        </p>
        {producto.descuento && (
          <p className="text-red-600 font-bold mt-2">
            Descuento: {producto.descuento}%
          </p>
        )}
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handleAddToCart(producto)}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

ProductoCard.propTypes = {
  producto: propTypes.shape({
    productoID: propTypes.number.isRequired,
    nombre: propTypes.string.isRequired,
    descripcion: propTypes.string.isRequired,
    imagen: propTypes.string.isRequired,
    precio: propTypes.number.isRequired,
    precio_formateado: propTypes.string.isRequired,
    descuento: propTypes.string,
    precio_con_descuento: propTypes.string,
  }).isRequired,
};

export default ProductoCard;
