import { createConnection } from "../config.js";

export class DetalleVentaModel {

    static async getById({ buyOrder }) {
        const connection = await createConnection();
        try {
            const [detalleVenta] = await connection.query(
                `SELECT p.nombre as "nombre", dv.precio as "precio", dv.cantidad as "cantidad" ,p.imagen as "imagen", pa.buyOrder as "buyOrder" FROM detalle_venta dv 
                INNER JOIN producto p ON dv.productoID = p.productoID 
                INNER JOIN pago pa ON dv.ventaID = pa.ventaID 
                WHERE pa.buyOrder = ? ; `,
                [buyOrder]
            );
            return detalleVenta;
        } finally {
            await connection.end();
        }
    }

}