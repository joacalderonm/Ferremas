import { Router } from "express";
import { MarcaController } from "../controllers/marcaController.js";

export const createMarcaRouter = ({ marcaModel }) => {

    const marcaRouter = Router()
    const marcaController = new MarcaController ({ marcaModel })

    marcaRouter.get('/', marcaController.getAll)
    marcaRouter.get('/:id', marcaController.getById )

    return marcaRouter
}