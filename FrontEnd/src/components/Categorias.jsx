import { useState, useEffect } from "react";
import { fetchCategoria } from "../api/api";
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
        setCategorias(data);
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
  <div className="cards-category flex flex-col space-y-0 md:flex-row md:space-y-0 md:space-x-0">
  {error ? (
    <p>{error}</p>
  ) : (
    <>
      {categorias.map((categoria) => (
        <div key={categoria.categoriaID} className="card" onClick={() => handleClick(categoria.categoriaID)}>
          <img src={categoria.imagen} alt={categoria.nombre} />
          <div className="info">
            <h3>{categoria.nombre}</h3>
          </div>
        </div>
      ))}
    </>
  )}
</div>

);

};

export default Categorias;
