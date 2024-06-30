import axios from 'axios';

const webpayPlusAPI = 'http://localhost:1234/webpay';

export const fetchCarrito = async (data) => {
  try {
      const response = await axios.post(`${webpayPlusAPI}/pagoFinal`, data);
      return response.data;
  } catch (error) {
      console.error('Error al obtener el carrito:', error);
      throw error;
  }
};

export const fetchCreate = async (data) => {
  try {
      const response = await axios.get(`${webpayPlusAPI}/create`, {
          params: data // Usar params para enviar los parámetros correctamente
      });
      return response.data;
  } catch (error) {
      console.error('Error al crear la transacción:', error);
      throw error;
  }
};

export const fetchToken = async (buyOrder) => {
  try {
      const response = await axios.get(`${webpayPlusAPI}/token/${buyOrder}`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener el token:', error);
      throw error;
  }
};


export const fetchCommit = async (data) => {
  try {
    const response = await axios.get(`${webpayPlusAPI}/commit`, data);
    return response.data;
  } catch (error) {
    console.error('Error al confirmar la transacción:', error);
    throw error;
  }
};

export const fetchCommitPost = async (data) => {
  try {
    const response = await axios.post(`${webpayPlusAPI}/commit`, data);
    return response.data;
  } catch (error) {
    console.error('Error al confirmar la transacción:', error);
    throw error;
  }
};

export const fetchStatus = async (data) => {
  try {
    const response = await axios.post(`${webpayPlusAPI}/status`, data);
    return response.data;
    
  } catch (error) {
    console.error('Error al obtener el estado de la transacción:', error);
    throw error;
  }
};

export const fetchRefund = async (data) => {
  try {
    const response = await axios.post(`${webpayPlusAPI}/refund`, data);
    return response.data;
  } catch (error) {
    console.error('Error al solicitar la devolución de la transacción:', error);
    throw error;
  }
};
