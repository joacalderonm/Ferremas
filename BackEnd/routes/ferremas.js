import { Router } from "express";
import { FerremasController } from "../controllers/ferremas.js";

export const createFerremaRouter = ({ ferremaModel }) => {

    const ferremasRouter = Router()
    const ferremaController = new FerremasController ({ ferremaModel })

    ferremasRouter.get('/', ferremaController.getAll)
    ferremasRouter.get('/:id', ferremaController.getById )
    ferremasRouter.post('/', ferremaController.create)
    ferremasRouter.delete('/:id', ferremaController.delete)
    ferremasRouter.patch('/:id', ferremaController.update )

    return ferremasRouter
}