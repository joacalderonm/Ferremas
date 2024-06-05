import axios from 'axios';

const productAPI = 'http://localhost:1234/producto';

export const fetchProducto = async () => {
  try {
    const response = await axios.get(productAPI);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

export const fetchProductosPorCategoria = async (id) => {
  try {
    const response = await axios.get(`${productAPI}/categoria/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos por categoría:', error);
    throw error;
  }
};

export const fetchMarcasForCategoria = async (id) => {
  try {
    const response = await axios.get(`${productAPI}/marcas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las marcas por categoría:', error);
    throw error;
  }
};

export const fetchMaterialForCategoria = async (id) => {
  try {
    const response = await axios.get(`${productAPI}/material/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los materiales por categoría:', error);
    throw error;
  }
};

export const fetchProductoByMaxPrice = async (id) => {
  try {
    const response = await axios.get(`${productAPI}/precio/${id}`);
    return response.data.precio;
  } catch (error) {
    console.error('Error al obtener los productos por precio máximo:', error);
    throw error;
  }
};

export const fetchRandomProductos = async () => {
  try {
    const response = await axios.get(productAPI);
    const productos = response.data;

    // Selecciona 15 productos aleatorios
    const productosAleatorios = productos
      .sort(() => Math.random() - Math.random())
      .slice(0, 10);

    return productosAleatorios;
  } catch (error) {
    console.error('Error al obtener los productos aleatorios:', error);
    throw error;
  }
};

export const fetchProductoById = async (id) => {
  try {
    const response = await axios.get(`${productAPI}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  } 
}