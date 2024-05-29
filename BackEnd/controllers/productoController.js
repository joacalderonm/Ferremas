import { validatePartialProducto, validateProducto } from "../schemas/productoSchema.js"

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

    getByCategory = async (req, res) => {
        const { categoriaID } = req.params
        const productos = await this.productoModel.getByCategory({ categoriaID })
        res.json(productos)
    }

    getByMarcasForCategoria = async (req, res) => {
        const { categoriaID } = req.params
        const productos = await this.productoModel.getByMarcasForCategoria({ categoriaID })
        res.json(productos)
    }

    getByMaterialForCategoria = async (req, res) => {
        const { categoriaID } = req.params
        const productos = await this.productoModel.getByMaterialForCategoria({ categoriaID })
        res.json(productos)
    }

    getByMaxPrice = async (req, res) => {
        const { precio } = req.params
        const productos = await this.productoModel.getByMaxPrice({ precio })
        res.json(productos)
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
