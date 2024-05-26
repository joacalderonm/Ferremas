import { validateMaterial, validatePartialMaterial} from "../schemas/materialSchema.js";

export class MaterialController {
  constructor({ materialModel }) {
    this.materialModel = materialModel;
  }

  getAll = async (req, res) => {
    try {
      const materiales = await this.materialModel.getAll();
      res.json(materiales);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener los materiales",
          error: error.message,
        });
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res
          .status(400)
          .json({ message: "El ID es necesario para la consulta" });
      }
      const material = await this.materialModel.getById({ id });
      if (material) {
        res.json(material);
      } else {
        res.status(404).json({ message: "Material no encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al buscar el material", error: error.message });
    }
  };

}
