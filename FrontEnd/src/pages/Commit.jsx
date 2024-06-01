import { useState, useEffect } from 'react';
import { fetchCommitPost } from '../api/apiWebpayPlus';

const Commit = () => {
  const [commitData, setCommitData] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState(''); // Nuevo estado para el estado de la transacción

  useEffect(() => {
    const storedToken = localStorage.getItem('webpayToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleCommit = async () => {
    try {
      setStatus('Procesando transacción...'); // Actualizar el estado de la transacción
      const data = await fetchCommitPost({ token_ws: token });
      setCommitData(data);
      setError(null);  // Limpiar el error si la confirmación fue exitosa
      setStatus('Transacción confirmada con éxito'); // Actualizar el estado de la transacción
    } catch (error) {
      console.error('Error al confirmar la transacción:', error);
      setError('Error al confirmar la transacción.');
      setStatus('Error al confirmar la transacción'); // Actualizar el estado de la transacción
    }
  };

  return (
    <div>
      <h1>Confirmar Transacción</h1>
      {token ? (
        <>
          <button onClick={handleCommit}>Confirmar Transacción</button>
          {status && <p>{status}</p>} {/* Mostrar el estado de la transacción */}
        </>
      ) : (
        <p>No se encontró un token válido. Por favor, inicie una nueva transacción.</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {commitData && (
        <div>
          <h2>{commitData.step}</h2>
          <p>{commitData.stepDescription}</p>
          <pre>{JSON.stringify(commitData.viewData.commitResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Commit;
