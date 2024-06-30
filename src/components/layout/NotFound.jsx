import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-8">La página que estas buscando no existe.</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Regresar al Index
      </Link>
    </div>
  );
};

export default NotFound;
