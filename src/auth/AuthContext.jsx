import { createContext, useContext, useState, useEffect } from 'react';
import { loginCliente, registerCliente, logoutCliente, getMe, api } from '../api/apiCliente';

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
        setUser(null); // Asegurarse de limpiar el usuario en caso de error
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginCliente(username, password);
      const { user, token } = response;
      localStorage.setItem('access_token', token); // Almacena el token en localStorage
      // Configura el encabezado de autorización para axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return user;
    } catch (error) {
      console.error('Error logging in', error);
      throw error; // Lanzar error para manejarlo en el componente que llama a login
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await registerCliente(username, email, password);
      const { user, token } = response;
      localStorage.setItem('access_token', token); // Almacena el token en localStorage
      // Configura el encabezado de autorización para axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return user;
    } catch (error) {
      console.error('Error registering', error);
      throw error; // Lanzar error para manejarlo en el componente que llama a register
    }
  };

  const logout = async () => {
    try {
      await logoutCliente();
      localStorage.removeItem('access_token'); // Elimina el token de localStorage
      delete api.defaults.headers.common['Authorization']; // Elimina el encabezado de autorización
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
