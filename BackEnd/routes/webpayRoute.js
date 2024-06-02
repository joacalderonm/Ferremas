import { Router } from "express";
import { WebpayController } from "../controllers/webpayController.js";

export const createWebpayRouter = () => {
    const webpayRouter = Router();
    const webpayController = new WebpayController();

    webpayRouter.get("/create", webpayController.create);
    webpayRouter.get("/commit", webpayController.commit);
    webpayRouter.post("/commit", webpayController.commit);
    webpayRouter.post("/status", webpayController.status);
    webpayRouter.post("/refund", webpayController.refund);

    return webpayRouter;
};
