import Slider from '../components/Slider';
import Oferta from '../components/Oferta';
import React from 'react';
import ReactDOM from 'react-dom';
//import Ofertas from '../components/Ofertas';

function Index() {
  return (
    <div>
      <Slider />

      <div class="flex justify-center mt-8">
  <h3 class="text-2xl font-bold">Ofertas en Ferremas</h3>

</div>
  <Oferta/>
    </div>
  );
}

export default Index;
