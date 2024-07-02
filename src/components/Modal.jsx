import { useRef } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ producto, closeModal, marcas, materiales }) => {
  const modalRef = useRef(null);

  const handleCloseModal = (event) => {
    if (modalRef.current === event.target) {
      closeModal();
    }
  };

  const marca = marcas.find((marca) => marca.marcaID === producto.marcaID);
  const material = materiales.find((material) => material.materialID === producto.materialID);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal} ref={modalRef}>
    <div className="relative bg-white p-6 rounded-3xl shadow-xl max-w-4xl w-full max-h-screen border-4 border-gray-300 flex flex-col lg:flex-row overflow-auto">
      {/* Botón de cierre */}
      <button className="absolute top-0 right-0 p-3" onClick={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Contenedor de la imagen */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white-200">
        <img className="max-w-full max-h-96 object-contain" src={producto.imagen} alt={producto.nombre} />
      </div>
      
      {/* Contenido del modal */}
      <div className="flex-1 lg:ml-6 mt-6 lg:mt-0 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-yellow-700">{producto.nombre}</h1>
        <p className="text-gray-800 mt-4">{producto.descripcion}</p>
        <p className="text-blue-900 font-bold mt-4 text-4xl">{producto.precio_formateado}</p>
        <hr className="mt-2 mb-4 border-gray-300" />
        <p className="mt-4 text-gray-600"><span className="font-bold">Marca:</span> {marca ? marca.nombre : 'Desconocida'}</p>
        <hr className="mt-2 mb-4 border-gray-300" />
        <p className="mt-2 text-gray-600"><span className="font-bold">Material:</span> {material ? material.nombre : 'Desconocido'}</p>
        <hr className="mt-2 mb-4 border-gray-300" />
        {producto.stock <= 0 ? ( 
          <p className="mt-4 text-red-600"><span className="font-bold">Producto Sin Stock</span></p>
        ) : (
          <p className="mt-4 text-green-600"><span className="font-bold">Stock:</span> {producto.stock}</p>
        )}
        <hr className="mt-2 mb-4 border-gray-300" />
        <div className="flex flex-col items-start mt-4">
          <div className="flex items-center mb-2">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked readOnly />
            <label className="ml-2 text-gray-800">Retiro en tienda</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked readOnly />
            <label className="ml-2 text-gray-800">Despacho a domicilio</label>
          </div>
        </div>
      </div>
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
    marcaID: PropTypes.number.isRequired,
    materialID: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  marcas: PropTypes.arrayOf(
    PropTypes.shape({
      marcaID: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  materiales: PropTypes.arrayOf(
    PropTypes.shape({
      materialID: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Modal;
