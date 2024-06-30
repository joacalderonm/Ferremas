import { Router } from "express";
import { VentaController } from "../controllers/ventaController.js";

export const createVentaRouter = ({ ventaModel }) => {
    const ventaRouter = Router();
    const ventaController = new VentaController({ ventaModel });
    
    ventaRouter.get("/:buyOrder", ventaController.getByVentaID);
    
    return ventaRouter;
};
