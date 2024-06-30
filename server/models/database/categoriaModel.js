import { createConnection } from '../config.js';

export class CategoriaModel {


    // GET

    static async getAll() {
        const connection = await createConnection();
        try {
            const [categorias] = await connection.query(
                'CALL getAllCategoria();'
            );
            return categorias[0];
        } finally {
            await connection.end();
        }
    }

    static async getById ({ id }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'CALL GetByIDCategoria(?);',
                [id]
            );
            const categorias = result[0];  
            return categorias.length > 0 ? categorias[0] : null;
        } finally {
            await connection.end();
        }
    }

    static async getByName ({ nombre }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'CALL GetByNombreCategoria(?);',
                [nombre]
            );
            const categorias = result[0];
            return categorias.length > 0 ? categorias[0] : null;
        } finally {
            await connection.end();
        }
    }

    // INSERT

    static async create ({ input }) {
        const { nombre, descripcion } = input;
        const connection = await createConnection();
        try {
            await connection.query(
                `CALL InsertCategoria(?,?);`,
                [nombre, descripcion]
            );
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            await connection.end();
        }
    }

    // DELETE

    static async delete ({ id }) {
        const connection = await createConnection();
        try {
            await connection.query(
                'DELETE FROM categoria WHERE categoriaID = ?;',
                [id]
            );
        } catch (error) {
            console.error('Error deleting data:', error);
        } finally {
            await connection.end();
        }
    }


    // UPDATE

    static async update({ id, input }) {
        const { nombre, descripcion } = input;
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'UPDATE categoria SET nombre = ?, descripcion = ? WHERE categoriaID = ?;',
                [nombre, descripcion, id]
            );
            console.log('Categoría actualizada con éxito');
            return result.affectedRows;  // Devuelve el número de filas afectadas
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;  // Lanza el error para manejarlo más arriba si es necesario
        } finally {
            await connection.end();
        }
    }    
    
}