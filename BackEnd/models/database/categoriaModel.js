import { createConnection } from "./config.js";

export class CategoriaModel {

    static async getAll() {
        const connection = await createConnection();
        try {
            const [categorias] = await connection.query(
                'SELECT * FROM categoria;'
            );
            return categorias;
        } finally {
            await connection.end();
        }
    }

    static async getById ({ id }) {
        const connection = await createConnection();
        try {
            const [categorias] = await connection.query(
                'SELECT * FROM categoria WHERE categoriaID = ?;',
                [id]
            );
            return categorias.length > 0 ? categorias[0] : null;
        } finally {
            await connection.end();
        }
    }

    static async create ({ input }) {
        const { nombre, descripcion } = input;
        const connection = await createConnection();
        try {
            await connection.query(
                `INSERT INTO categoria (nombre, descripcion) VALUES (?,?);`,
                [nombre, descripcion]
            );
            console.log(result);
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            await connection.end();
        }
    }

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