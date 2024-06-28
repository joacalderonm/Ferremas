const CommitError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Error en la Transacción</h1>
        <p className="text-center text-red-500">Hubo un problema al procesar la transacción. Por favor, inténtelo nuevamente.</p>
        <div className="text-center mt-4">
          <button
            className="mt-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition-colors"
            onClick={() => window.location.href = '/'}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommitError;
