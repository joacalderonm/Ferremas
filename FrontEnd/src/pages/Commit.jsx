import { useState, useEffect } from 'react';
import { fetchCommitPost } from '../api/apiWebpayPlus';
import { fetchVentaDetalleGetByID } from '../api/apiVentaDetalle';
import { useCart } from '../components/CartContext';

const Commit = () => {
  const { dispatch } = useCart();
  const [commitData, setCommitData] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('webpayToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    const obtenerCarrito = async () => {
      if (commitData && commitData.viewData.commitResponse.buy_order) {
        try {
          const ventaDetalleData = await fetchVentaDetalleGetByID(commitData.viewData.commitResponse.buy_order);
          console.log('Carrito:', ventaDetalleData);
          setDetalleVenta(ventaDetalleData);
        } catch (error) {
          console.error('Error al obtener el carrito:', error);
          setError('Error al obtener el carrito: ' + error.message);
        }
      }
    };
  
    obtenerCarrito();
  }, [commitData]);

  const handleCommit = async () => {
    try {
      const data = { token_ws: token }; // Asegúrate de que el token sea correcto y esté presente
      const commitData = await fetchCommitPost(data);
      setCommitData(commitData);
      setError(null);
      
      // Limpiar el carrito después de confirmar la transacción
      dispatch({ type: 'CLEAR_CART' });
      
      // Eliminar el token de localStorage después de confirmar la transacción
      localStorage.removeItem('webpayToken');
      setToken(null);

      // Ocultar el botón y mostrar el mensaje
      setButtonVisible(false);
      setShowMessage(true);
      
    } catch (error) {
      console.error('El usuario cancelo la compra:', error);
      setError('El usuario cancelo la compra');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Confirmar Transacción</h1>
        {!token ? (
          <div className="text-center">
            <p className="text-red-500">No se encontró un token válido. Por favor, inicie una nueva transacción.</p>
            <button
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Volver al Inicio
            </button>
          </div>
        ) : (
          <>
            {buttonVisible && (
              <div className="text-center">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition-colors"
                  onClick={handleCommit}
                >
                  Confirmar Transacción
                </button>
              </div>
            )}
            {showMessage && (
              <div className="text-center">
                <p className="text-green-500 mt-4">Esto se verá una sola vez.</p>
              </div>
            )}
          </>
        )}
        {error && (
          <div className="mt-4 text-center">
            <p className="text-red-500">{error}</p>
            <button
              className="mt-4 bg-red-500 text-white font-semibold py-2 px-6 rounded hover:bg-red-600 transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Volver al Inicio
            </button>
          </div>
        )}
        {commitData && token && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
            {commitData.viewData.commitResponse && (
              <div className="mb-4 text-center">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Detalles de la Transacción</h3>
                <div className="text-gray-700 space-y-2">
                  <p><span className="font-bold">Estado:</span> {commitData.viewData.commitResponse.status}</p>
                  <p><span className="font-bold">Número de Orden:</span> {commitData.viewData.commitResponse.buy_order}</p>
                  <p><span className="font-bold">Monto:</span> ${commitData.viewData.commitResponse.amount}</p>
                  <p><span className="font-bold">Fecha:</span> {new Date(commitData.viewData.commitResponse.transaction_date).toLocaleString()}</p>
                  <p><span className="font-bold">Método de Pago:</span> {commitData.viewData.commitResponse.payment_type_code}</p>
                </div>
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">Productos Comprados</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2">Producto</th>
                      <th className="py-2">Precio</th>
                      <th className="py-2">Cantidad</th>
                      <th className="py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {detalleVenta.map((producto, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-4 text-center">{producto.nombre}</td>
                        <td className="py-2 px-4 text-center">${producto.precio}</td>
                        <td className="py-2 px-4 text-center">{producto.cantidad}</td>
                        <td className="py-2 px-4 text-center">${(producto.precio * producto.cantidad).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button className="mt-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition-colors"
                        onClick={() => window.location.href = '/'} >
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Commit;
