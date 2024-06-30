import axios from 'axios';

const ventaDetalleAPI = 'http://localhost:1234/detalleVenta';

export const fetchVentaDetalleGetByID = async ( buyOrder ) => {
    try {
        const response = await axios.get(`${ventaDetalleAPI}/${buyOrder}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los detalles de venta:', error);
        throw error;
    }
}
