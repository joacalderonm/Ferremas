import pkg from "transbank-sdk";
const { WebpayPlus } = pkg;
import asyncHandler from "../utils/async_handler.js";
import { validateVenta, validateDetalleVenta  } from "../schemas/webpaySchema.js";


export class WebpayController {

  constructor({ webpayModel }) {
    this.webpayModel = webpayModel;
  }

  createVenta = async (req, res) => {
    const { clienteID, productos } = req.body;

    const ventaResult = validateVenta({ clienteID });
    if (!ventaResult.success) {
        return res.status(400).json({ error: ventaResult.error });
    }
    
    try {
        const ventaID = await this.webpayModel.createVenta({ clienteID });

        for (let producto of productos) {
          const detalleResult = validateDetalleVenta({
            ventaID,
            productoID: producto.productoID,
            cantidad: producto.cantidad,
            precio: producto.precio
        });
          if (!detalleResult.success) {
              return res.status(400).json({ error: detalleResult.error });
          }
            await this.webpayModel.createDetalleVenta({
                ventaID,
                productoID: producto.productoID,
                cantidad: producto.cantidad,
                precio: producto.precio
            });
        }

        res.status(201).json({ message: 'Venta creada con éxito', ventaID });
    } catch (error) {
        console.error('Error en la creación de la venta: ', error);
        res.status(500).json({ message: 'Error en la creación de la venta' });
    }
  }


  create = asyncHandler(async (req, res, next) => {
    let buyOrder = "O-" + Math.floor(Math.random() * 100000);
    let sessionId = "S-" + Math.floor(Math.random() * 100000);
    let amount = Math.floor(Math.random() * 1000) + 1000;
    let returnUrl = "http://localhost:5173/commit"
    
    const createResponse = await new WebpayPlus.Transaction().create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );
    
    let token = createResponse.token;
    let url = createResponse.url;
    
    let viewData = {
      buyOrder,
      sessionId,
      amount,
      returnUrl,
      token,
      url,
    };
    
    res.json(viewData);
  });
  
  commit = asyncHandler(async (req, res, next) => {
    try {

      console.log("================================================================================");
      console.log(req);
      console.log("================================================================================");
      let params = req.method === "GET" ? req.query : req.body;
      
      let token = params.token_ws;
      let tbkToken = params.TBK_TOKEN;
      let tbkOrdenCompra = params.TBK_ORDEN_COMPRA;
      let tbkIdSesion = params.TBK_ID_SESION;
      
      let step = null;
      let stepDescription = null;
      let viewData = {
      token,
      tbkToken,
      tbkOrdenCompra,
      tbkIdSesion,
    };
    
    if (token && !tbkToken) {
      // Flujo 1
      const commitResponse = await new WebpayPlus.Transaction().commit(token);
      viewData = {
        token,
        commitResponse,
      };
      step = "Confirmar Transacción";
      stepDescription =
      "En este paso tenemos que confirmar la transacción con el objetivo de avisar a " +
      "Transbank que hemos recibido la transacción ha sido recibida exitosamente. En caso de que " +
      "no se confirme la transacción, ésta será regresada.";
      
      res.json({ step, stepDescription, viewData });
      return;
    } else if (!token && !tbkToken) {
      // Flujo 2
      step = "El pago fue anulado por tiempo de espera.";
      stepDescription =
      "En este paso luego de anulación por tiempo de espera (+10 minutos) no es necesario realizar la confirmación ";
    } else if (!token && tbkToken) {
      // Flujo 3
      step = "El pago fue anulado por el usuario.";
      stepDescription =
      "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    } else if (token && tbkToken) {
      // Flujo 4
      step = "El pago es inválido.";
      stepDescription =
      "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
    
    res.json({ step, stepDescription, viewData });
  } catch (error) {
    console.error('Error en commit:', error);
    res.status(500).json({ message: 'Error al confirmar la transacción' });
  }
  });
  
  status = asyncHandler(async (req, res, next) => {
    let token = req.body.token;
    
    const statusResponse = await new WebpayPlus.Transaction().status(token);
    
    let viewData = {
      token,
      statusResponse,
    };
    
    res.json({ step: "Estado de Transacción", stepDescription: "Puedes solicitar el estado de una transacción hasta 7 días después de que haya sido realizada. No hay limite de solicitudes de este tipo, sin embargo, una vez pasados los 7 días ya no podrás revisar su estado.", viewData });
  });
  
  refund = asyncHandler(async (req, res, next) => {
    let { token, amount } = req.body;
    
    const refundResponse = await new WebpayPlus.Transaction().refund(
      token,
      amount
    );
    
    let viewData = {
      token,
      amount,
      refundResponse,
    };
    
    res.json({ step: "Reembolso de Transacción", stepDescription: "Podrás pedir el reembolso del dinero al tarjeta habiente, dependiendo del monto y el tiempo transcurrido será una Reversa, Anulación o Anulación parcial.", viewData });
  });
}
