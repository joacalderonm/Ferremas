import PropTypes from 'prop-types';

const Filtro = ({ marcas, materiales, marcaFiltro, materialFiltro, setMarcaFiltro, setMaterialFiltro }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Filtrar por</h3>
      <div className="mb-4">
        <label className="block mb-2">
          Marca:
          <select
            value={marcaFiltro}
            onChange={(e) => setMarcaFiltro(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Todas las Marcas</option>
            {marcas.map((marca) => (
              <option key={marca.marcaID} value={marca.marcaID}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          Material:
          <select
            value={materialFiltro}
            onChange={(e) => setMaterialFiltro(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos los Materiales</option>
            {materiales.map((material) => (
              <option key={material.materialID} value={material.materialID}>
                {material.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

Filtro.propTypes = {
  marcas: PropTypes.arrayOf(
    PropTypes.shape({
      marcaID: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  materiales: PropTypes.arrayOf(
    PropTypes.shape({
      materialID: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  marcaFiltro: PropTypes.string.isRequired,
  materialFiltro: PropTypes.string.isRequired,
  setMarcaFiltro: PropTypes.func.isRequired,
  setMaterialFiltro: PropTypes.func.isRequired,
};

export default Filtro;