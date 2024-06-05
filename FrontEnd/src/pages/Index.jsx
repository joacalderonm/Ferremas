import Slider from '../components/Slider';
import Oferta from '../components/Oferta';
import React from 'react';
import ReactDOM from 'react-dom';
//import Ofertas from '../components/Ofertas';

function Index() {
  return (
    <div>
      <Slider />

      <div className="mx-auto lg:w-3/4 xl:w-2/3 px-4 mt-5">
  <h3 className="text-center text-4xl font-bold mb-5">Ofertas de la semana en Ferremas</h3>
  <Oferta />

</div>
  
    </div>
  );
}

export default Index;
