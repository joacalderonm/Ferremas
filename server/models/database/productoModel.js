import { createConnection } from "../config.js";
export class ProductoModel {

    static async getAll () {
        const connection = await createConnection();
        const [result] = await connection.query(
            'CALL GetAllProducto();'
        );
        return result[0];
        
    }

    static async getById({ id }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                "CALL GetByIDProducto(?);",
                [id]
            );
            const productos = result[0];
            return productos.length > 0 ? productos[0] : null;
        } finally {
            await connection.end();
        }
    }

    static async getByCategory({ categoriaID }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                "CALL GetByCategoriaProducto(?);",
                [categoriaID]
            );
            const productos = result[0];
            return productos;
        } finally {
            await connection.end();
        }
    }

    static async getByMarcasForCategoria ({ categoriaID}) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'CALL GetByMarcasProducto(?)',
                [categoriaID]
            );
            const productos = result[0];
            return productos;
        } finally {
            await connection.end();
        }
    }


    static async getByMaterialForCategoria ({ categoriaID }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'CALL GetByMaterialProducto(?);',
                [categoriaID]
            );
            const productos = result[0];
            return productos;
        } finally {
            await connection.end();
        }
    }

    static async getByMaxPrice ({ categoriaID }) {
        const connection = await createConnection();
        try {
            const [result] = await connection.query(
                'CALL GetByMaxPriceProducto(?)',
                [categoriaID]
            );
            const productos = result[0];
            return productos;
        } finally {
            await connection.end();
        }
    }

}