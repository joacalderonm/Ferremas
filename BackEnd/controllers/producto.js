import { validatePartialProducto, validateProducto } from "../schemas/producto.js"

export class ProductoController {
    
    constructor ({ productoModel }){
        this.productoModel = productoModel
    }

    getAll = async (req, res) => {
        const {nombre} = req.query
        const productos = await this.productoModel.getAll({ nombre })
        res.json(productos)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const producto = await this.productoModel.getById({ id })
        if (producto) return res.json(producto)
        res.status(404).json({message: 'No encontrado'})
    }

    create = async  (req, res) => {
        const result = validateProducto(req.body)

        if (!result.success) {

            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const newProducto = await this.productoModel.create({ input: result.data })
    
        res.status(201).json(newProducto)
    }

    delete = async (req, res) => {
        const {id} = req.params
    
        const result = await this.productoModel.delete({ id })

        if (result  === false ) {
            return res.status(404).json({ message: 'Producto no encontrado'})
        } 
        
        return res.json({ message: 'Producto eliminado'})
    }

    update = async (req, res) => {
        const result = validatePartialProducto(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message)})
        }
    
        const { id } = req.params
    
        const updateProducto = await this.productoModel.update({ id, input: result.data })
    
        return res.json(updateProducto)
    }
}
