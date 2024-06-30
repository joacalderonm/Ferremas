import { createConnection } from "../config.js";

export class MaterialModel {

    static async getAll() {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'CALL getAllMateriales();'
            );
            return result[0];
        } finally {
            await connection.end();
        }
    }

    static async getById({ id }) {  
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'CALL GetByIDMaterial(?);',
                [id]
            );
            const materiales = result[0];
            return materiales.length > 0 ? materiales[0] : null;
        } finally {
            await connection.end();
        }
    }
}
