import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Boleta = ({ commitData, detalleVenta }) => {

    const navigate = useNavigate();
    
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center border-b pb-2">Boleta de Compra</h3>
      <div className="mb-6 text-center">
        <div className="text-gray-800 space-y-4">
          <p><span className="font-bold">Estado:</span> {commitData.viewData.commitResponse.status}</p>
          <p><span className="font-bold">Número de Orden:</span> {commitData.viewData.commitResponse.buy_order}</p>
          <p><span className="font-bold">Monto:</span> ${commitData.viewData.commitResponse.amount}</p>
          <p><span className="font-bold">Fecha:</span> {new Date(commitData.viewData.commitResponse.transaction_date).toLocaleString()}</p>
          <p><span className="font-bold">Método de Pago:</span> {commitData.viewData.commitResponse.payment_type_code}</p>
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center border-b pb-2">Productos Comprados</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-semibold">Producto</th>
              <th className="py-3 px-4 text-gray-800 font-semibold">Precio</th>
              <th className="py-3 px-4 text-gray-800 font-semibold">Cantidad</th>
              <th className="py-3 px-4 text-gray-800 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {detalleVenta.map((producto, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4 text-center">{producto.nombre}</td>
                <td className="py-3 px-4 text-center">${producto.precio}</td>
                <td className="py-3 px-4 text-center">{producto.cantidad}</td>
                <td className="py-3 px-4 text-center">${(producto.precio * producto.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                onClick={() => navigate('/')}>
          Volver al Inicio
        </button>
      </div>
    </div>
    
    );
  }

Boleta.propTypes = {
    commitData: PropTypes.object.isRequired,
    detalleVenta: PropTypes.array.isRequired,
};
  
  export default Boleta;