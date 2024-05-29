import axios from 'axios';

const materialAPI = 'http://localhost:1234/material';

export const fetchMaterial = async () => {
  try {
    const response = await axios.get(materialAPI);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los materiales:', error);
    throw error;
  }
};

export const fetchMaterialById = async (id) => {
  try {
    const response = await axios.get(`${materialAPI}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el material:', error);
    throw error;
  }
}
