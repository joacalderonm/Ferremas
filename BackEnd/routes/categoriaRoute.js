import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController.js";

export const createCategoriaRouter = ({ categoriaModel }) => {

    const categoriaRouter = Router()
    const categoriaController = new CategoriaController ({ categoriaModel })

    categoriaRouter.get('/', categoriaController.getAll)
    categoriaRouter.get('/:id', categoriaController.getById )
    categoriaRouter.post('/', categoriaController.create)
    categoriaRouter.delete('/:id', categoriaController.delete)
    categoriaRouter.patch('/:id', categoriaController.update )

    return categoriaRouter
}