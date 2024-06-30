import axios from 'axios';

const productAPI = 'http://localhost:1234/producto'; // Asegúrate de que el puerto y ruta son correctos.
const categoryAPI= 'http://localhost:1234/categoria';
const materialAPI = 'http://localhost:1234/material';
const marcaAPI = 'http://localhost:1234/marca';

// Productos

export const fetchProducto = async () => {
  try {
    const response = await axios.get(productAPI);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

// Categorías

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

export const fetchProductosPorCategoria = async (id) => {
  try {
    const response = await axios.get(`${productAPI}/categoria/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos por categoría:', error);
    throw error;
  }
}

// Materiales

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

// Marcas

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