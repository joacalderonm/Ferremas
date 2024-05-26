import { createConnection } from "./config.js";

export class MaterialModel {

    static async getAll() {
        const connection = await createConnection();
        try {
            const [materiales] = await connection.query(
                'SELECT * FROM material;'
            );
            return materiales;
        } finally {
            await connection.end();
        }
    }

    static async getById({ id }) {  
        const connection = await createConnection();
        try {
            const [materiales] = await connection.query(
                'SELECT * FROM material WHERE materialID = ?;',
                [id]
            );
            return materiales.length > 0 ? materiales[0] : null;
        } finally {
            await connection.end();
        }
    }
}
