import { createContext, useContext, useState, useEffect } from 'react';
import { loginCliente, registerCliente, logoutCliente, getMe, api } from '../api/apiCliente';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          // Configura el encabezado de autorización para axios
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await getMe(); // Extrae el usuario de la respuesta
          setUser(response.user[0]);
        }
      } catch (error) {
        console.error('Error checking auth', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginCliente(username, password);
      localStorage.setItem('access_token', response.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      setUser(response.user); // Extrae el usuario del primer elemento del array
    } catch (error) {
      console.error('Error logging in', error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await registerCliente(username, email, password);
      localStorage.setItem('access_token', response.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      setUser(response.user); // Extrae el usuario del primer elemento del array
    } catch (error) {
      console.error('Error registering', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutCliente();
      localStorage.removeItem('access_token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;