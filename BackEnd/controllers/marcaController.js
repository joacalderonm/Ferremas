import { validateMarca, validatePartialMarca } from "../schemas/marcaSchema.js";

export class MarcaController {
    constructor ({ marcaModel }){
        this.marcaModel = marcaModel
    }   

    getAll = async (req, res) => {
        try {
            const marcas = await this.marcaModel.getAll();
            res.json(marcas);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las marcas", error: error.message });
        }
    }; 

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "El ID es necesario para la consulta" });
            }
            const marca = await this.marcaModel.getById({ id });
            if (marca) {
                res.json(marca);
            } else {
                res.status(404).json({ message: "Marca no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al buscar la marca", error: error.message });
        }
    };
}