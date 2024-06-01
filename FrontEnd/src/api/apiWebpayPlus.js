import axios from 'axios';

const webpayPlusAPI = 'http://localhost:1234/webpay';

export const fetchCreate = async () => {
  try {
    const response = await axios.get(`${webpayPlusAPI}/create`);
    return response.data;
  } catch (error) {
    console.error('Error al crear la transacción:', error);
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
