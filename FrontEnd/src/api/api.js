import axios from 'axios';

const productAPI = 'http://localhost:1234/producto'; // Asegúrate de que el puerto y ruta son correctos.

export const fetchProducto = async () => {
  try {
    const response = await axios.get(productAPI);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

const categoryAPI= 'http://localhost:1234/categoria';

export const fetchCategoria = async () => {
  try {
    const response = await axios.get(categoryAPI);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw error;
  }
}


