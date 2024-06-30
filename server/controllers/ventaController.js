export class VentaController {

    constructor ({ ventaModel }){
        this.ventaModel = ventaModel
    }

    getByVentaID = async (req, res) => {
        const { buyOrder } = req.params
        const venta = await this.ventaModel.getByVentaID({ buyOrder })
        if (venta) return res.json(venta)
        res.status(404).json({message: 'No encontrado'})
    }
}