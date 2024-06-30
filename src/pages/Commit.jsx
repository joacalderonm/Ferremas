import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCommitPost } from '../api/apiWebpayPlus';
import { fetchVentaDetalleGetByID } from '../api/apiVentaDetalle';
import { useCart } from '../components/CartContext';
import Boleta from '../components/Boleta';

const Commit = () => {
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const [commitData, setCommitData] = useState(null);
  const [token, setToken] = useState('');
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('webpayToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/commit_error');
    }
  }, [navigate]);

  useEffect(() => {
    const handleCommit = async () => {
      try {
        const data = { token_ws: token };
        const commitData = await fetchCommitPost(data);
        setCommitData(commitData);

        dispatch({ type: 'CLEAR_CART' });

        // Eliminar el token de localStorage después de confirmar la transacción
        localStorage.removeItem('webpayToken');
        setToken(null); 

        if (commitData.viewData.commitResponse.status === "AUTHORIZED") {
          setShowMessage(true);
        } else {
          navigate('/commit_error');
        }
      } catch (error) {
        console.error('El usuario canceló la compra:', error);
        navigate('/commit_error');
      }
    };

    if (token) {
      handleCommit();
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    const obtenerCarrito = async () => {
      if (commitData && commitData.viewData && commitData.viewData.commitResponse && commitData.viewData.commitResponse.buy_order) {
        try {
          const ventaDetalleData = await fetchVentaDetalleGetByID(commitData.viewData.commitResponse.buy_order);
          console.log('Carrito:', ventaDetalleData);
          setDetalleVenta(ventaDetalleData);
          
        } catch (error) {
          console.error('Error al obtener el carrito:', error);
        }
      }
    };

    obtenerCarrito();
  }, [commitData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Confirmar Transacción</h1>
        {showMessage && commitData && (
          <div className="text-center mt-4">
            <Boleta commitData={commitData} detalleVenta={detalleVenta} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Commit;
