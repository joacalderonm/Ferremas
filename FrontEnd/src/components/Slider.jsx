import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/Slider.css'; // Importa tus estilos de Tailwind aquí si los tienes
export const Slider = () => {
    return (
      <div>
        {/* Primer slider */}
        <div className="carousel-container">
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showArrows={false}
            showStatus={false}
            swipeable={true}
          >
            <div>
              <img src="https://conocedores.com/wp-content/uploads/2016/06/googlemapslogo.jpg" alt="Imagen 1" />
              <div className="carousel-caption">
                <h2 className="text-white text-3xl">Bienvenido a nuestra tienda de ferretería</h2>
                <p className="text-white text-lg">Encuentra las mejores herramientas y materiales para tus proyectos</p>
                <button className="visitar-btn">Visita la tienda</button>
              </div>
            </div>
            <div>
              <img src="https://i.pinimg.com/originals/ee/bf/a1/eebfa10c787154892f38e4565b352588.jpg" alt="Imagen 2" />
              <div className="carousel-caption">
                <h2 className="text-white text-3xl">Bienvenido a nuestra tienda de ferretería</h2>
                <p className="text-white text-lg">Encuentra las mejores herramientas y materiales para tus proyectos</p>
                <button className="visitar-btn">Visita la tienda</button>
              </div>
            </div>
            {/* Agrega más slides aquí si lo deseas */}
          </Carousel>
        </div>
        
        {/* Segundo slider */}
        <div className="carousel-container">
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showArrows={false}
            showStatus={false}
            swipeable={true}
          >
            {/* Agrega tus slides para el segundo slider aquí */}
          </Carousel>
        </div>
      </div>
    );
  };
  
export default Slider;