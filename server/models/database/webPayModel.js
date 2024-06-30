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

    static async createPago(input) {
        const { ventaID, buyOrder, sessionId, fecha = new Date(), amount, metodoPagoID, estadoPago, token } = input;
        const connection = await createConnection();

        try {
            await connection.query(
                'INSERT INTO pago (VentaID, buyOrder, sessionId, fecha, amount, metodoPagoID, estadoPago, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [ventaID, buyOrder, sessionId, fecha, amount, metodoPagoID, estadoPago, token]
            );
        } catch (error) {
            console.error('Error al crear pago en la base de datos:', error.message);
            throw new Error('Error al crear pago en la base de datos: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async getVentaIdByBuyOrder (buyOrder) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'SELECT v.ventaID FROM venta v INNER JOIN pago p ON v.ventaID = p.ventaID WHERE p.buyOrder = ?',
                [buyOrder]
            );
            if (result.length > 0) {
                return result[0].ventaID;
            } else {
                throw new Error('Venta no encontrada para la orden de compra proporcionada.');
            }
        } catch (error) {
            console.error('Error al obtener el ID de la venta por la orden de compra:', error.message);
            throw new Error('Error al obtener el ID de la venta por la orden de compra: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async updateEstadoVenta (input) {
        const { estado, ventaID } = input;
        const connection = await createConnection();

        try {
            await connection.query(
                'UPDATE venta SET estado = ? WHERE ventaID = ?',
                [estado, ventaID]
            );
        } catch (error) {
            console.error('Error al actualizar el estado de la venta:', error.message);
            throw new Error('Error al actualizar el estado de la venta: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async updatePagoToken (input) {
        const { token, buyOrder } = input;
        const connection = await createConnection();
        
        try {
            await connection.query(
                'UPDATE pago SET token = ? WHERE buyOrder = ?',
                [token, buyOrder]
            );
        } catch (error) {
            console.error('Error al actualizar el token del pago:', error.message);
            throw new Error('Error al actualizar el token del pago: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async getToken (input) {
        const { buyOrder } = input;
        const connection = await createConnection();

        try {
            const [rows] = await connection.query(
                'SELECT token FROM pago WHERE buyOrder = ?',
                [buyOrder]
            );
            if (rows.length > 0) {
                return rows[0].token;
            } else {
                throw new Error('Token no encontrado para la orden de compra proporcionada.');
            }
        } catch (error) {
            console.error('Error al obtener el token del pago:', error.message);
            throw new Error('Error al obtener el token del pago: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async calcularTotalVenta(ventaID) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query(
                'SELECT SUM(cantidad * precio) AS total FROM detalle_venta WHERE ventaID = ?',
                [ventaID]
            );
            return rows[0].total;
        } catch (error) {
            console.error('Error al calcular el total de la venta:', error.message);
            throw new Error('Error al calcular el total de la venta: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async getVentaIdByToken({ token }) {
        const connection = await createConnection();
        try {
            const [productos] = await connection.query(
                `SELECT dv.productoID as "productoID", dv.cantidad as "cantidad"
                FROM detalle_venta dv 
                INNER JOIN pago p ON dv.ventaID = p.ventaID
                WHERE p.token = ?;`,
                [token]
            );

            return productos;
        } finally {
            await connection.end();
        }
    }

    static async updateStock ({ stock, productoID }) {
        const connection = await createConnection();
        try {
            await connection.query(
                'UPDATE producto SET stock = stock - ? WHERE productoID = ?;',
                [stock, productoID]
            );
        } finally {
            await connection.end();
        }
    }

}
