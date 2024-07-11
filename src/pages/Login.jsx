import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password);
      navigate('/'); // Redirigir a la página protegida después de iniciar sesión
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error al conectar con el servidor');
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 relative">
        {/* Aquí deberías colocar la URL correcta para tu imagen */}
        <img src="URL_DE_TU_IMAGEN" alt="Ferremas" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">FERREMAS</h1>
        </div>
      </div>
      <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center p-8">
        <h2 className="text-4xl font-bold mb-4 text-center">Bienvenido de Vuelta</h2>
        <p className="text-center mb-6">¿No tienes cuenta? <Link to="/register" className="text-blue-400 hover:underline">Regístrate</Link></p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-2">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500"/>
              <span className="ml-2 text-gray-300">Recordarme</span>
            </label>
            <Link to="/forgot-password" className="text-blue-400 hover:underline">Olvidé mi contraseña</Link>
          </div>
          <button type="submit" className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
