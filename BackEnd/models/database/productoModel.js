import { createConnection } from "./config.js";

export class ProductoModel {
    static async getAll ({ nombre }) {
        const connection = await createConnection();
        if (nombre) {
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

    static async getById({ id }) {
        const connection = await createConnection();
        try {
            const [productos] = await connection.query(
                "SELECT * FROM producto WHERE productoID = ?;",
                [id]
            );
            // Verifica si hay productos y retorna el primer producto si existe, de lo contrario retorna null
            return productos.length > 0 ? productos[0] : null;
        } finally {
            await connection.end();
        }
    }

    static async getByCategory({ categoriaID }) {
        const connection = await createConnection();
        try {
            const [productos] = await connection.query(
                "SELECT *, FORMAT(precio, 'de_DE') AS precio_formateado FROM producto WHERE categoriaID = ?;",
                [categoriaID]
            );
            return productos;
        } finally {
            await connection.end();
        }
    }

    static async getByMarcasForCategoria ({ categoriaID}) {
        const connection = await createConnection();
        try {
            const [productos] = await connection.query(
                'SELECT DISTINCT p.marcaID, m.nombre FROM producto p inner join marca m on p.marcaID = m.marcaID WHERE categoriaID = ?;',
                [categoriaID]
            );
            return productos;
        } finally {
            await connection.end();
        }
    }


    static async getByMaterialForCategoria ({ categoriaID }) {
        const connection = await createConnection();
        try {
            const [productos] = await connection.query(
                'SELECT DISTINCT p.materialID, m.nombre FROM producto p inner join material m on p.materialID = m.materialID WHERE categoriaID = ?;',
                [categoriaID]
            );
            return productos;
        } finally {
            await connection.end();
        }
    }

    static async getByMaxPrice ({ categoriaID }) {
        const connection = await createConnection();
        try {
            const [productos] = await connection.query(
                'SELECT MAX(precio) AS precio FROM producto WHERE categoriaID = ?;',
                [categoriaID]
            );
            return productos;
        } finally {
            await connection.end();
        }
    }

    static async create({ input }) {
        const { nombre, descripcion, precio, stock, categoriaID } = input
        const connection = await createConnection();
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
        const connection = await createConnection();
        const [producto] = await connection.query(
            'DELETE FROM producto  WHERE productoID = ?;',
            [id]
        )
    }
    static async update ({ }){

    }

}