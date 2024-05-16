import { useState, useEffect } from "react";
import { fetchCategoria } from "../api/api";
import "../css/Styles.css";


const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);

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

  /*
  const categorias = [
    {
      id: 1,
      producto: 'BATERÍAS Y CARGADORES',
    imagen: 'https://media.licdn.com/dms/image/D4D22AQGEHgf7aJeU-A/feedshare-shrink_2048_1536/0/1712224286224?e=1718841600&v=beta&t=YFcxTdli3sS8PMW0ykfVBD0LqoDyPO_WfMRSGtE2m8g'
      },
    {
      id: 2,
      producto: 'TALADROS',
      
      imagen: 'https://i0.wp.com/ensedeciencia.com/wp-content/uploads/2024/04/Copia-de-Copia-de-Copia-de-Copia-de-Copia-de-Plantilla-TECNOLOGIA-2024-04-29T151831.180.jpg?resize=1200%2C630&ssl=1'
    
    },
    {
        id: 3,
        producto: 'Sierras y cortadoras',
     
        imagen: 'https://www.manmadediy.com/wp-content/uploads/sites/52/2023/12/Miter-Saw-3-27386-2048x1367.png'
       
      },
      {
        id: 4   ,
        producto: 'Llaves de impacto',
     
        imagen: 'https://www.olipes.com/eu/c/329-medium_default/xjuntas-cardan-homocineticas.jpg.pagespeed.ic.g5y9bm24qW.webp'
     
      },
      {
        id: 5   ,
        producto: 'Accesorios',
      
        imagen: 'https://c7.alamy.com/comp/G0GCK0/set-of-spanners-G0GCK0.jpg'
      
      },
      {
        id: 6   ,
        producto: 'Herramientas Manuales',
      
        imagen: 'https://www.deferreteria.com/img/cms/Herramientas%20Manuales.jpg'
      
      },
      {
        id: 7   ,
        producto: 'Esmeriles',
      
        imagen: 'https://i0.wp.com/crownrentalsinc.com/wp-content/uploads/2024/01/8-1.png?w=1080&ssl=1'
      
      },
      {
        id: 8   ,
        producto: 'Destornilladores',
      
        imagen: 'https://scontent.fccp1-1.fna.fbcdn.net/v/t1.6435-9/116153656_3161098500594062_2751182372199146885_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YWmMlkGP3c0Q7kNvgEHJWiP&_nc_ht=scontent.fccp1-1.fna&oh=00_AYDNW9Z-MSAt28PC5yQ9EnCScAa2WonKFoXQmtXMM7aQAA&oe=666B8C80'
      
      },
      {
        id: 9   ,
        producto: 'Destornillador',
      
        imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain'
      
      },
      {
        id: 10   ,
        producto: 'Destornillador',
      
        imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain'
      
      },
      {
        id: 11   ,
        producto: 'Destornillador',
      
        imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain'
      
      },
      {
        id: 12   ,
        producto: 'Destornillador',
      
        imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain'
      
      }

  ];
*/

return (
  <div className="cards-category">
    {error ? (
      <p>{error}</p>
    ) : (
      <>
        <h1>Categorías</h1>
        {categorias.map((categoria) => (
          <div key={categoria.id} className="card">
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
