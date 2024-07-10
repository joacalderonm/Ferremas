import { createConnection } from '../config.js';

export class webPayModel {
    
    static async createVenta(venta) {
        const { fecha = new Date(), clienteID , estado = 'PENDIENTE' } = venta;
        const connection = await createConnection();
        let ventaID;

        try {
            await connection.beginTransaction();

            await connection.query(
                'CALL InsertVenta(?, ?, ?, @ventaID)',
                [fecha, clienteID, estado]
            );

            const [[{ ventaID: insertedVentaID }]] = await connection.query('SELECT @ventaID AS ventaID');
            ventaID = insertedVentaID;

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
                'CALL InsertDetalleVenta(?, ?, ?, ?)',
                [ventaID, productoID, cantidad, precio]
            );
        } catch (error) {
            console.error('Error al crear detalle de venta:', error.message);
            throw new Error('Error al crear detalle de venta: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async calcularTotalVenta(ventaID) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query(
                'SELECT CalcularTotalVenta(?) AS total',
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
    
    static async createPago(input) {
        const { ventaID, buyOrder, sessionId, fecha = new Date(), amount, metodoPagoID, estadoPago, token } = input;
        const connection = await createConnection();

        try {
            await connection.query(
                'CALL InsertPago(?, ?, ?, ?, ?, ?, ?, ?)',
                [ventaID, buyOrder, sessionId, fecha, amount, metodoPagoID, estadoPago, token]
            );
        } catch (error) {
            console.error('Error al crear pago en la base de datos:', error.message);
            throw new Error('Error al crear pago en la base de datos: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async getVentaIdByBuyOrder(buyOrder) {
        const connection = await createConnection();
        let ventaID;
        try {
            await connection.query(
                'CALL GetVentaIdByBuyOrder(?, @ventaID)',
                [buyOrder]
            );
            const [[{ ventaID: p_ventaID }]] = await connection.query('SELECT @ventaID AS ventaID');
            ventaID = p_ventaID;
            return ventaID;
        } catch (error) {
            console.error('Error al obtener el ID de la venta por la orden de compra:', error.message);
            throw new Error('Error al obtener el ID de la venta por la orden de compra: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async updateEstadoVenta(input) {
        const { estado, ventaID } = input;
        const connection = await createConnection();

        try {
            await connection.query(
                'CALL UpdateEstadoVenta(?, ?)',
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
                'CALL UpdatePagoToken(?, ?)',
                [token, buyOrder]
            );
        } catch (error) {
            console.error('Error al actualizar el token del pago:', error.message);
            throw new Error('Error al actualizar el token del pago: ' + error.message);
        } finally {
            await connection.end();
        }
    }

    static async getToken(input) {
        const { buyOrder } = input;
        const connection = await createConnection();

        try {
            await connection.query(
                'CALL GetTokenByBuyOrder(?, @token)',
                [buyOrder]
            );
            const [[{ p_token }]] = await connection.query('SELECT @token AS token');
            if (p_token) {
                return p_token;
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

    static async getVentaIdByToken({ token }) {
        const connection = await createConnection();
        try {
            const [results] = await connection.query(
                `CALL getVentaIdByToken(?);`,
                [token]
            );
            const productos = results[0];
            return productos;
        } finally {
            await connection.end();
        }
    }
    

    static async updateStock({ stock, productoID }) {
        const connection = await createConnection();
        try {
            await connection.query(
                'CALL UpdateProductoStock(?, ?)',
                [stock, productoID]
            );
        } catch (error) {
            console.error('Error al actualizar el stock del producto:', error.message);
            throw new Error('Error al actualizar el stock del producto: ' + error.message);
        } finally {
            await connection.end();
        }
    }

}
