export class DetalleVentaController {
  constructor({ detalleVentaModel }) {
    this.detalleVentaModel = detalleVentaModel;
  }

   getById = async (req, res) => {
    const { buyOrder } = req.params;
    try {
      if (!buyOrder) {
        return res.status(400).json({ message: "El ID es necesario para la consulta" });
      }
      const detalleVenta = await this.detalleVentaModel.getById({ buyOrder });
      if (detalleVenta) {
        res.json(detalleVenta);
      } else {
        res.status(404).json({ message: "Detalle de venta no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al buscar el detalle de venta", error: error.message });
    }
  }

}