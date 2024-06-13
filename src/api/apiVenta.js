import axios from "axios";

const ventaAPI = "http://localhost:1234/venta";

export const fetchGetVentaID = async (buyOrder) => {
    try {
        const response = await axios.get(`${ventaAPI}/${buyOrder}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las ventas:", error);
        throw error;
    }
};