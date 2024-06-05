import PropTypes from 'prop-types';

const Modal = ({ producto, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-gray-700 font-semibold">&times;</button>
        </div>
        <div className="w-full h-48 flex items-center justify-center mb-4">
          <img className="max-w-full max-h-full object-contain" src={producto.imagen} alt={producto.nombre} />
        </div>
        <h1 className="text-xl font-bold">{producto.nombre}</h1>
        <p className="text-green-800 mt-2 font-bold">STOCK: {producto.stock}</p>
        <p className="text-gray-700 mt-2">{producto.descripcion}</p>
       
        <p className="text-blue-600 font-bold mt-4">Precio: ${producto.precio_formateado}</p>
        <p className="mt-2">Marca: {producto.marca}</p>
        <p className="mt-2">Material: {producto.material}</p>
      </div>
    </div>
  );
};

Modal.propTypes = {
  producto: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    precio_formateado: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
