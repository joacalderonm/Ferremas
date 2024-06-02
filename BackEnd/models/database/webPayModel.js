import { createConnection } from '../config.js';

export class webPayModel {
    static async createVenta(venta) {
        const { fecha = new Date(), clienteID = 1, estado = 'PENDIENTE' } = venta;
        const connection = await createConnection();
        let ventaID;

        try {
            await connection.beginTransaction();

            const [result] = await connection.query(
                'INSERT INTO venta (fecha, clienteID, estado) VALUES (?, ?, ?)',
                [fecha, clienteID, estado]
            );

            ventaID = result.insertId;

            await connection.commit();
        } catch (error) {
            if (connection) await connection.rollback();
            console.error('Error al crear venta:', error.message);
            throw new Error('Error al crear venta: ' + error.message);
        } finally {
            await connection.end();
        }

        return ventaID;
    }

    static async createDetalleVenta(detalleVenta) {
        const { ventaID, productoID, cantidad, precio } = detalleVenta;
        const connection = await createConnection();

        try {
            await connection.query(
                'INSERT INTO detalle_venta (ventaID, productoID, cantidad, precio) VALUES (?, ?, ?, ?)',
                [ventaID, productoID, cantidad, precio]
            );
        } catch (error) {
            console.error('Error al crear detalle de venta:', error.message);
            throw new Error('Error al crear detalle de venta: ' + error.message);
        } finally {
            await connection.end();
        }
    }
}
