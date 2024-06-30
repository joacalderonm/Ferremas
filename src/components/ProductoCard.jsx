import propTypes from 'prop-types';
import { useCart } from './CartContext';

const ProductoCard = ({ producto }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (producto) => {
    dispatch({ type: 'ADD_TO_CART', product: producto });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <div className="w-full h-48 flex items-center justify-center">
      <img className="max-w-full max-h-full object-contain" src={producto.imagen} alt={producto.nombre} />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h4 className="text-lg font-semibold">{producto.nombre}</h4>
      <p className="text-gray-700 mt-2">{producto.descripcion}</p>
     
        
      <div className="flex-grow"></div> {/* Este div se expandirá para llenar el espacio */}
      
      <div className="mt-auto"> <p className="text-black-600 font-bold mt-4">
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
        <button
          className="w-full bg-gray-500 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handleAddToCart(producto)}
        >
          Añadir al Carrito
        </button>
      </div>
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
