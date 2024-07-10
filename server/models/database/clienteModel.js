import { createConnection } from "../config.js";

export class ClienteModel {

    static async getById({ clienteID }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                `CALL GetByIdCliente (?) ; `,
                [clienteID]
            );
            return result[0];
        } finally {
            await connection.end();
        }
    }

    static async getByName({ username }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                `CALL GetByUsernameCliente(?);`,
                [username]
            );
            return result[0][0];
        } finally {
            await connection.end();
        }
    }
    
    static async getByEmail({ email }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                `CALL GetByEmailCliente(?);`,
                [email]
            );
            const cliente = result[0];
            return cliente.length > 0 ? cliente[0] : null;
        } finally {
            await connection.end();
        }
    }

    static async create ({ input }) {
        const { username, email, contraseña} = input;
        const connection = await createConnection();
        try {
            await connection.query(
                `CALL CreateCliente (?,?,?);`,
                [username, email, contraseña]
            );
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            await connection.end();
        }
    }
}