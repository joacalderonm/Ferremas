import axios from "axios";

const categoryAPI = 'http://localhost:1234/categoria';

export const fetchCategoria = async () => {
    try {
      const response = await axios.get(categoryAPI);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      throw error;
    }
  }
  
  export const fetchCategoriaByNombre = async (nombre) => {
    try {
      const response = await axios.get(`${categoryAPI}/${nombre}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
      throw error;
    }
  }
  
  export const fetchCategoriaById = async (id) => { 
    try {
      const response = await axios.get(`${categoryAPI}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
      throw error;
    }
  }