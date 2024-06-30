import axios from "axios";

const marcaAPI = 'http://localhost:1234/marca';

export const fetchMarca = async () => { 
    try {
      const response = await axios.get(marcaAPI);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
      throw error;
    }
  } 
  
  export const fetchMarcaById = async (id) => {
    try {
      const response = await axios.get(`${marcaAPI}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la marca:', error);
      throw error;
    }
  }