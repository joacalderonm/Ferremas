import { createConnection } from "../config.js";

export class DetalleVentaModel {

    static async getById({ buyOrder }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                `CALL GetByIDDetalleVenta (?) ; `,
                [buyOrder]
            );
            return result[0];
        } finally {
            await connection.end();
        }
    }

}