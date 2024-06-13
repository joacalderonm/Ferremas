import { validateFerremas, validatePartialFerremas } from '../schemas/ferremas.js'

export class FerremasController {
    
    constructor ({ ferremaModel }){
        this.ferremaModel = ferremaModel
    }

    getAll = async (req, res) => {
        const {nombre} = req.query
        const ferremas = await this.ferremaModel.getAll({ nombre })
        res.json(ferremas)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const ferrema = await this.ferremaModel.getById({ id })
        if (ferrema) return res.json(ferrema)
        res.status(404).json({message: 'Not Found'})
    }

    create = async  (req, res) => {
        const result = validateFerremas(req.body)

        if (!result.success) {
            //
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const newFerremas = await this.ferremaModel.create({ input: result.data })
    
        res.status(201).json(newFerremas)
    }

    delete = async (req, res) => {
        const {id} = req.params
    
        const result = await this.ferremaModel.delete({ id })

        if (result  === false ) {
            return res.status(404).json({ message: 'Ferremas not found '})
        } 
        
        return res.json({ message: 'ferrema eliminado'})
    }

    update = async (req, res) => {
        const result = validatePartialFerremas(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message)})
        }
    
        const { id } = req.params
    
        const updateFerremas = await this.ferremaModel.update({ id, input: result.data })
    
        return res.json(updateFerremas)
        
    }
}
