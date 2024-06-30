import pkg from "transbank-sdk";
const { WebpayPlus } = pkg;
import asyncHandler from "../utils/async_handler.js";
import { validateVenta, validateDetalleVenta, validatePago } from "../schemas/webpaySchema.js";
import { v4 as uuidv4 } from "uuid";

export class WebpayController {
  constructor({ webpayModel }) {
    this.webpayModel = webpayModel;
  }

  createVentaConPagoYTransaccion = asyncHandler(async (req, res) => {
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

        const amount = await this.webpayModel.calcularTotalVenta(ventaID);
        const buyOrder = `O-${uuidv4().slice(0, 20)}`;
        const sessionId = `S-${uuidv4().slice(0, 20)}`;
        const pagoData = {
            ventaID,
            buyOrder,
            sessionId,
            amount: Number(amount),
            metodoPagoID: 1,
            estadoPago: 'PROCESANDO',
            token: null,
        };

        const pagoResult = validatePago(pagoData);
        if (!pagoResult.success) {
            return res.status(400).json({ error: pagoResult.error.errors });
        }

        await this.webpayModel.createPago(pagoResult.data);

        res.status(201).json({ message: 'Venta y pago creada con éxito', ventaID, buyOrder, sessionId, amount });
    } catch (error) {
        console.error('Error en la creación de la venta, pago o transacción: ', error);
        res.status(500).json({ message: 'Error en la creación de la venta, pago o transacción', details: error.message });
    }
  });

  getToken = asyncHandler(async (req, res) => {
    try {
      const { input } = req.params;
      const token = await this.webpayModel.getToken({ buyOrder: input });
      res.json({ token });
    } catch (error) {
      console.error('Error al obtener el token:', error);
      res.status(500).json({ message: 'Error al obtener el token', details: error.message });
    }
  });

  create = asyncHandler(async (req, res) => {
    const { buyOrder, sessionId, amount } = req.query;
    const returnUrl = "http://localhost:5173/commit";

    if (!buyOrder || !sessionId || !amount) {
        return res.status(400).json({ message: 'buyOrder, sessionId y amount son requeridos' });
    }

    try {
        const createResponse = await new WebpayPlus.Transaction().create(
            buyOrder,
            sessionId,
            amount,
            returnUrl
        );

        const token = createResponse.token;
        const url = createResponse.url;

        await this.webpayModel.updatePagoToken({ buyOrder, token });

        const viewData = {
            buyOrder,
            sessionId,
            amount,
            returnUrl,
            token,
            url,
        };

        res.json({
            step: "Crear Transacción",
            stepDescription: "En este paso se crea la transacción y se obtiene un token que será utilizado para redirigir al usuario a la página de pago.",
            viewData
        });
    } catch (error) {
        console.error('Error al crear la transacción:', error.message);
        res.status(500).json({ message: 'Error al crear la transacción', details: error.message });
    }
  });

  // Función para confirmar la transacción en Webpay
  commit = asyncHandler(async (req, res) => {
    try {
      console.log("================================================================================");
      console.log(req.body);
      console.log("================================================================================");
  
      let params = req.method === "GET" ? req.query : req.body;
  
      let token = params.token_ws;
      let tbkToken = params.TBK_TOKEN;
      let tbkOrdenCompra = params.TBK_ORDEN_COMPRA;
      let tbkIdSesion = params.TBK_ID_SESION;
  
      console.log("token: ", token, "tbkToken: ", tbkToken, "tbkOrdenCompra: ", tbkOrdenCompra, "tbkIdSesion: ", tbkIdSesion);
  
      let step = null;
      let stepDescription = null;
      let viewData = {
        token,
        tbkToken,
        tbkOrdenCompra,
        tbkIdSesion,
      };
  
      if (token && !tbkToken) {
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
  
        if (commitResponse.status === 'AUTHORIZED') {
          const productos = await this.webpayModel.getVentaIdByToken({ token });
          console.log("Productos recuperados: ", productos);
  
          for (const producto of productos) {
            await this.webpayModel.updateStock({ stock: producto.cantidad, productoID: producto.productoID });
            console.log("Producto actualizado: ", producto.productoID, producto.cantidad);
          }
  
          const ventaID = await this.webpayModel.getVentaIdByBuyOrder(commitResponse.buy_order);
  
          await this.webpayModel.updateEstadoVenta({
            estado: commitResponse.status,
            ventaID: ventaID
          });
  
          res.json({ step, stepDescription, viewData });
          return;
        }
      } else if (!token && !tbkToken) {
        step = "El pago fue anulado por tiempo de espera.";
        stepDescription = "En este paso luego de anulación por tiempo de espera (+10 minutos) no es necesario realizar la confirmación ";
      } else if (!token && tbkToken) {
        step = "El pago fue anulado por el usuario.";
        stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
      } else if (token && tbkToken) {
        step = "El pago es inválido.";
        stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
      }
  
      const ventaID = await this.webpayModel.getVentaIdByBuyOrder(commitResponse.buy_order);
  
      await this.webpayModel.updateEstadoVenta({
        estado: commitResponse.status,
        ventaID: ventaID
      });
  
      res.json({ step, stepDescription, viewData });
    } catch (error) {
      console.error('Error en commit:', error);
      res.status(500).json({ message: 'Error al confirmar la transacción', details: error.message });
    }
  });

  status = asyncHandler(async (req, res) => {
    let token = req.body.token;
    
    const statusResponse = await new WebpayPlus.Transaction().status(token);
    
    let viewData = {
      token,
      statusResponse,
    };
    
    res.json({ step: "Estado de Transacción", stepDescription: "Puedes solicitar el estado de una transacción hasta 7 días después de que haya sido realizada. No hay limite de solicitudes de este tipo, sin embargo, una vez pasados los 7 días ya no podrás revisar su estado.", viewData });
  });

  refund = asyncHandler(async (req, res) => {
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
