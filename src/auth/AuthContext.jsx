import { createContext, useContext, useState, useEffect } from 'react';
import { loginCliente, registerCliente, logoutCliente, getMe } from '../api/apiCliente.js';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga para verificar autenticación

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('access_token');
        if (token) {
          const response = await getMe();
          setUser(response.user);
        }
      } catch (error) {
        console.error('Error checking auth', error);
      } finally {
        setLoading(false); // Asegurarse de que el estado de carga se establezca a false
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    const response = await loginCliente(username, password);
    setUser(response.user);
  };

  const register = async (username, email, password) => {
    const response = await registerCliente(username, email, password);
    setUser(response.user);
  };

  const logout = async () => {
    await logoutCliente();
    Cookies.remove('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children} {/* Renderizar los hijos solo cuando no esté cargando */}
    </AuthContext.Provider>
  );
};
