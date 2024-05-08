// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:1234/producto'; // Asegúrate de que el puerto y ruta son correctos.

export const fetchProducto = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};
