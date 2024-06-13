import { validateCategoria, validatePartialCategoria } from "../schemas/categoriaSchema.js";

export class CategoriaController {

    constructor ({ categoriaModel }){
        this.categoriaModel = categoriaModel
    }

    getAll = async (req, res) => {
        try {
            const categorias = await this.categoriaModel.getAll();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las categorías", error: error.message });
        }
    };


    getById = async (req, res) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "El ID es necesario para la consulta" });
            }
            const categoria = await this.categoriaModel.getById({ id });
            if (categoria) {
                res.json(categoria);
            } else {
                res.status(404).json({ message: "Categoría no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al buscar la categoría", error: error.message });
        }
    };

    getByName = async (req, res) => {
        const { nombre } = req.params;
        try {
            if (!nombre) {
                return res.status(400).json({ message: "El nombre es necesario para la consulta" });
            }
            const categoria = await this.categoriaModel.getByName({ nombre });
            if (categoria) {
                res.json(categoria);
            } else {
                res.status(404).json({ message: "Categoría no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al buscar la categoría", error: error.message });
        }
    };

    create = async  (req, res) => {
        const result = validateCategoria(req.body)

        if (!result.success) {

            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const newCategoria = await this.categoriaModel.create({ input: result.data })
    
        res.status(201).json(newCategoria)
    }   

    delete = async (req, res) => {
        const {id} = req.params
    
        const result = await this.categoriaModel.delete({ id })

        if (result  === false ) {
            return res.status(404).json({ message: 'Categoria no encontrada'})
        } 
        
        return res.json({ message: 'Categoria eliminada'})
    }  

    update = async (req, res) => {
        const result = validatePartialCategoria(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message)})
        }
    
        const { id } = req.params
    
        const updateCategoria = await this.categoriaModel.update({ id, input: result.data })
    
        return res.json(updateCategoria)
    }

}