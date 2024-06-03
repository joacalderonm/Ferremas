import { Router } from "express";
import { DetalleVentaController } from "../controllers/detalleVentaController.js";

export const createDetalleVentaRouter = ({ detalleVentaModel }) => {

    const detalleVentaRouter = Router();
    const detalleVentaController = new DetalleVentaController({ detalleVentaModel });

    detalleVentaRouter.get('/:buyOrder', detalleVentaController.getById);

    return detalleVentaRouter;
}
