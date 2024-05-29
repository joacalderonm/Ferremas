import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategoriaById } from '../api/apiCategoria.js'; 
import { fetchProductosPorCategoria, fetchMarcasForCategoria, fetchMaterialForCategoria } from '../api/apiProducto.js';
import Filtro from '../components/Filtro.jsx';
import '../css/CategoriaDetalle.css';
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
  const [precioMin, setPrecioMin] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const categoriaData = await fetchCategoriaById(id);
        setCategoria(categoriaData);
        
        const productosByCategoryData = await fetchProductosPorCategoria(categoriaData.categoriaID);
        const productosMayus = productosByCategoryData.map((producto) => ({
          ...producto,
          nombre: producto.nombre.toUpperCase(),
          precio: parseFloat(producto.precio),
          precio_formateado: producto.precio_formateado ? producto.precio_formateado : null
        }));
        
        setProductos(productosMayus);

        const marcasData = await fetchMarcasForCategoria(categoriaData.categoriaID);
        setMarcas(marcasData);

        const materialesData = await fetchMaterialForCategoria(categoriaData.categoriaID);
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
      const cumpleMarca = marcaFiltro === '' || producto.marcaID === parseInt(marcaFiltro);
      const cumpleMaterial = materialFiltro === '' || producto.materialID === parseInt(materialFiltro);
      const cumplePrecioMin = precioMin === '' || producto.precio >= parseFloat(precioMin);
      return cumpleMarca && cumpleMaterial && cumplePrecioMin;
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!categoria) {
    return <p>Cargando...</p>;
  }

  const productosFiltrados = filtrarProductos(productos);

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
          precioMin={precioMin}
          setPrecioMin={setPrecioMin}
        />
      </div>
      <div className="md:w-3/4">
        <Producto
          categoria={categoria}
          filtrarProductos={filtrarProductos}
          productos={productosFiltrados}
        />
      </div>
    </div>
  );
};

export default CategoriaDetalle;
