import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategoriaById, fetchProductosPorCategoria, fetchMarca, fetchMaterial } from '../api/api.js'; 
import Filtro from '../components/Filtro.jsx';
import '../css/CategoriaDetalle.css'
import Producto from '../components/Producto.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';

const CategoriaDetalle = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [materialFiltro, setMaterialFiltro] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        console.log('ID de la categoría a buscar:', id); 
        const categoriaData = await fetchCategoriaById(id);
        setCategoria(categoriaData);
        
        const productosByCategoryData = await fetchProductosPorCategoria(categoriaData.categoriaID);
        const productosMayus = productosByCategoryData.map((producto) => ({
          ... producto,
          nombre: producto.nombre.toUpperCase(),
        }));
        
        setProductos(productosMayus);

        const marcasData = await fetchMarca();
        setMarcas(marcasData);

        const materialesData = await fetchMaterial();
        setMateriales(materialesData);
      } catch (error) {
        console.error('Error al cargar los detalles de la categoría y los productos:', error);
        setError('No se pudieron cargar los detalles de la categoría y los productos');
      }
    };

    obtenerDatos();
  }, [id]);

  const filtrarProductos = (productos) => {
    return productos.filter((producto) => {
      return (
        (marcaFiltro === '' || producto.marcaID === parseInt(marcaFiltro)) &&
        (materialFiltro === '' || producto.materialID === parseInt(materialFiltro))
      );
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!categoria) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-4 md:flex md:space-x-4">
      <div className="md:w-1/4 p-4 border-r md:border-r-0 md:border-b md:mb-4">
        <Breadcrumb categoria={categoria.nombre} />
        <Filtro
          marcas={marcas}
          materiales={materiales}
          marcaFiltro={marcaFiltro}
          materialFiltro={materialFiltro}
          setMarcaFiltro={setMarcaFiltro}
          setMaterialFiltro={setMaterialFiltro}
        />
      </div>
      <div className="md:w-3/4">
        
        <Producto
          categoria={categoria}
          filtrarProductos={filtrarProductos}
          productos={productos}
        />

      </div>
    </div>
  );
};

export default CategoriaDetalle;
