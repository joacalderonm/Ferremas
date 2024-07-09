import axios from "axios";

const clientAPI = 'http://localhost:1234';

const api = axios.create({
  baseURL: clientAPI,
  withCredentials: true, 
});

export const loginCliente = async (username, contraseña) => {
  try {
    const response = await api.post('/login', { username, contraseña });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const registerCliente = async (username, email, contraseña) => {
  try {
    const response = await api.post('/register', { username, email, contraseña });
    return response.data;
  } catch (error) {
    console.error('Error al registrar:', error);
    throw error;
  }
};

export const logoutCliente = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};
