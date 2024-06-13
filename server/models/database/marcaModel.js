import { createConnection } from '../config.js';
export class MarcaModel {

    static async getAll() {
        const connection = await createConnection();
        try {
            const [marcas] = await connection.query(
                'SELECT * FROM marca;'
            );
            return marcas;
        } finally {
            await connection.end();
        }
    }  

    static async getById({ id }) {
        const connection = await createConnection();
        try {
            const [marcas] = await connection.query(
                'SELECT * FROM marca WHERE marcaID = ?;',
                [id]
            );
            return marcas.length > 0 ? marcas[0] : null;
        } finally {
            await connection.end();
        }
    }       
    

}