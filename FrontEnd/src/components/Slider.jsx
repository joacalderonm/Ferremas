import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { Link, useLocation } from 'react-router-dom';

import slider1 from '../assets/slider1.png';
import slider2 from '../assets/slider2.png';
import slider3 from '../assets/slider3.png';

const images = [slider1];

const ImageCarousel = () => {
  const settings = {
  };

  return (
    <div className="relative w-full h-96">
  
        {images.map((image, index) => (
          <div key={index} className="relative h-96">
            <img 
              src={image} 
              alt={`Slide ${index}`} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-center">La tienda online de herramientas Ferremas</h2>
              <p className="text-sm md:text-lg mb-4 md:mb-6 text-center">Descuentos y promociones únicas</p>
              <Link to="/categoria" className="px-2 md:px-3 py-1 md:py-2 bg-red-600 text-white rounded-lg text-sm md:text-base">Ver Tienda</Link>
            </div>
          </div>
        ))}
    
    </div>
  );
};

export default ImageCarousel;