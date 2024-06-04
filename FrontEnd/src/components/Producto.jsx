import propTypes from 'prop-types';
import { useCart } from '../components/CartContext';
  
const Producto = ({categoria, filtrarProductos, productos}) => {

    const { dispatch } = useCart();
  
    const handleAddToCart = (producto) => {
      dispatch({ type: 'ADD_TO_CART', product: producto });
    };


  return (
    <div>
    <h2 className="text-2xl font-bold text-center mb-10">{categoria.nombre}</h2>
    <h3 className="text-xl font-semibold mb-2">Productos</h3>
    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {filtrarProductos(productos).length > 0 ? (
        filtrarProductos(productos).map((producto) => (
          <div key={producto.productoID} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-48 flex items-center justify-center">
              <img className="max-w-full max-h-full object-contain" src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold">{producto.nombre}</h4>
              <p className="text-gray-700 mt-2">{producto.descripcion}</p>
              <p className="text-blue-600 font-bold mt-4">Precio: ${producto.precio_formateado}</p>
              <button
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleAddToCart(producto)}  // Utilizar productoID en lugar de id
                >
                  Añadir al Carrito
                </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>No hay productos disponibles para esta categoría.</p>
        </div>
      )}
    </div>
  </div>
  );
};

Producto.propTypes = {
  categoria: propTypes.shape({
    nombre: propTypes.string.isRequired,
  }).isRequired,
  filtrarProductos: propTypes.func.isRequired,
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
};

export default Producto;