import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Filtro = ({ marcas, materiales, marcaFiltro, materialFiltro, setMarcaFiltro, setMaterialFiltro, precioMin, setPrecioMin, setPrecioMax, maxPrecio }) => {
  const [localPrecioMin, setLocalPrecioMin] = useState(precioMin);
  const [localPrecioMax, setLocalPrecioMax] = useState(maxPrecio);

  useEffect(() => {
    setLocalPrecioMax(maxPrecio);
    setPrecioMax(maxPrecio);
  }, [maxPrecio, setPrecioMax]);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalPrecioMin(value);
    setPrecioMin(value);
  };

  return (
    <div className="space-y-4">
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
        <div className="mt-4">
          <label htmlFor="minmax-range" className="block mb-2 ">Rango de Precio:</label>
          <input
            id="minmax-range"
            type="range"
            min="0"
            max={localPrecioMax}
            value={localPrecioMin}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${localPrecioMin}</span>
            <span>${localPrecioMax}</span>
          </div>
        </div>
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
  precioMin: PropTypes.number.isRequired,
  setPrecioMin: PropTypes.func.isRequired,
  precioMax: PropTypes.number.isRequired,
  setPrecioMax: PropTypes.func.isRequired,
  maxPrecio: PropTypes.number.isRequired,
};

export default Filtro;
