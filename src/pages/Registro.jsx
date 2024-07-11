import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Registro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await register(username, email, password);
      setSuccess('Registro exitoso. Redirigiendo a la página de inicio de sesión...');
      setTimeout(() => {
        navigate('/login'); // Redirigir a la página de inicio de sesión después del registro
      }, 2000);
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
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">FERREMAS</h1>
        </div>
      </div>
      <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center p-8">
        <h2 className="text-4xl font-bold mb-4 text-center">Regístrate</h2>
        <p className="text-center mb-6">¿Ya tienes una cuenta? <Link to="/login" className="text-blue-400 hover:underline">Inicia sesión</Link></p>
        <form onSubmit={handleRegister}>
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
            <label htmlFor="email" className="block text-gray-300 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <button type="submit" className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
