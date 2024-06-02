import { Router } from "express";
import { WebpayController } from "../controllers/webpayController.js";

export const createWebpayRouter = ({ webpayModel }) => {
  const webpayRouter = Router();
  const webpayController = new WebpayController({ webpayModel });

  webpayRouter.post("/comprar", webpayController.createVenta);
  webpayRouter.get("/create", webpayController.create);
  webpayRouter.get("/commit", webpayController.commit);
  webpayRouter.post("/commit", webpayController.commit);
  webpayRouter.post("/status", webpayController.status);
  webpayRouter.post("/refund", webpayController.refund);

  return webpayRouter;
};
