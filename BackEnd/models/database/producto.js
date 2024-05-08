import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'ferremas'
}

const connection = await mysql.createConnection(config)

export class ProductoModel {
    static async getAll ({ nombre }) {
        

        if (nombre) {
            console.log ('hola')
            const lowerCaseNombre = nombre.toLowerCase();

            const [nombres] = await connection.query(
                'SELECT p.*, c.* FROM producto p JOIN categoria c ON p.categoriaID = c.categoriaID WHERE LOWER(c.nombre) = ?;',
                [lowerCaseNombre]
            )
    
            if (nombres.length === 0) return []

            const [{ id }] = nombres

            return []
        }
        console.log('getAll')
        const [producto] = await connection.query(
            'SELECT * FROM producto;'
        )
        
        return producto
    }

    static async getById ({ id }){
        const [producto] = await connection.query(
            `SELECT * FROM producto
            WHERE productoID = ?;`,
            [id]
        )

        if (producto.length === 0) return null
        
        return producto[0]
    }

    static async create({ input }) {
        const { nombre, descripcion, precio, stock, categoriaID } = input
    
        try {
            await connection.query(
                `INSERT INTO producto (nombre,descripcion,precio,stock,categoriaID) VALUES (?,?,?,?,?);`,
                [nombre, descripcion, precio, stock, categoriaID] // Ensure the comma is here
            );
            console.log(result);
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    }

    static async delete ({ id }){
        const [producto] = await connection.query(
            'DELETE FROM producto  WHERE productoID = ?;',
            [id]
        )
    }
    static async update ({ }){

    }

}