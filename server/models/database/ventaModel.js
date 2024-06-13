import { createConnection } from "../config.js";

export class VentaModel {
    static async getByVentaID({ buyOrder }) {  
        const connection = await createConnection();
        try {
            const [venta] = await connection.query(
                `SELECT v.estado FROM venta v
                INNER JOIN pago pa ON v.ventaID = pa.ventaID  
                WHERE pa.buyOrder = ?;`,
                [buyOrder]
            );
            return venta.length > 0 ? venta[0] : null;
        } finally {
            await connection.end();
        }
    }
}