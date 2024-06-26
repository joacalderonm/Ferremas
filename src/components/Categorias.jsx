import { useState, useEffect } from "react";
import { fetchCategoria } from "../api/apiCategoria.js";
import { useNavigate } from "react-router-dom";
import "../css/Styles.css";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const data = await fetchCategoria();
        const categoriaMayus = data.map((categoria, index) => ({
          ...categoria,
          nombre: categoria.nombre.toUpperCase(),
          key: index,  // Generar una clave única temporalmente si es necesario
        }));
        setCategorias(categoriaMayus);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
        setError("No se pudieron cargar las categorías");
      }
    };

    obtenerCategorias();
  }, []);

  const handleClick = (categoriaID) => {
    navigate(`/categoria/${categoriaID}`);
  };

  return (
    <div className="container mx-auto p-4 ">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
          {categorias.map((categoria) => (
            <div
              key={categoria.categoriaID}  // Asegúrate de que este campo sea único
              className="relative group cursor-pointer transition-opacity group-hover:opacity-100 "
              onClick={() => handleClick(categoria.categoriaID)}
            >
              <img
                src={categoria.imagen}
                alt={categoria.nombre}
                className="w-full h-64 object-cover rounded-lg bg-black bg-opacity-10  shadow-md transform   group-hover:scale-80"
              />
              <div className=" absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity">
              <h3 className="w-full text-center bg-red-600 p-2 text-white text-lg font-bold">{categoria.nombre}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categorias;
