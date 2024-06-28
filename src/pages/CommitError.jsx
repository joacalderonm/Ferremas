import { useNavigate } from 'react-router-dom';

const CommitError = () => {
  const navigate = useNavigate();
  const error = 'Error en la transacción. Por favor, inténtalo nuevamente.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Error en la Transacción</h1>
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
          <button
            className="mt-4 bg-red-500 text-white font-semibold py-2 px-6 rounded hover:bg-red-600 transition-colors"
            onClick={() => navigate('/')}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommitError;
