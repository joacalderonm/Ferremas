import { useRef } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ producto, closeModal }) => {
  const modalRef = useRef(null);

  const handleCloseModal = (event) => {
    if (modalRef.current === event.target) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal} ref={modalRef}>
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-4xl w-full border-4 border-gray-300 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-auto flex items-center justify-center mb-4 lg:mb-0 lg:border-b-0 border-b-2 border-gray-200 pb-4 bg-white-200">
          <img className="max-w-full max-h-full object-contain" src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="flex-1 lg:ml-6 mt-6 lg:mt-0 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-yellow-700">{producto.nombre}</h1>
          <p className="text-gray-800 mt-4">{producto.descripcion}</p>
          <p className="text-blue-900 font-bold mt-4 text-4xl">{producto.precio_formateado}</p>
          <hr className="mt-2 mb-4 border-gray-300" />
          <p className="mt-4 text-gray-600"><span className="font-bold">Marca:</span> {producto.marca}</p>
          <hr className="mt-2 mb-4 border-gray-300" />
          <p className="mt-2 text-gray-600"><span className="font-bold">Material:</span> {producto.material}</p>
          <hr className="mt-2 mb-4 border-gray-300" />
          <p className="mt-4 text-green-600"><span className="font-bold">Stock:</span> {producto.stock}</p>
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
    marca: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
