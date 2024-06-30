import { createConnection } from '../config.js';
export class MarcaModel {

    static async getAll() {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'CALL GetAllMarca();'
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
                'CALL GetByIDMarca(id);',
                [id]
            );
            const marcas = result[0];
            return marcas.length > 0 ? marcas[0] : null;
        } finally {
            await connection.end();
        }
    }       
    

}