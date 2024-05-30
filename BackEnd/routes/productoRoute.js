import { Router } from "express";
import { ProductoController } from "../controllers/productoController.js";

export const createProductoRouter = ({ productoModel }) => {

    const productoRouter = Router()
    const productoController = new ProductoController ({ productoModel })

    productoRouter.get('/', productoController.getAll)
    productoRouter.get('/:id', productoController.getById )
    productoRouter.get('/categoria/:categoriaID', productoController.getByCategory )
    productoRouter.post('/', productoController.create)
    productoRouter.delete('/:id', productoController.delete)
    productoRouter.patch('/:id', productoController.update )

    return productoRouter
}