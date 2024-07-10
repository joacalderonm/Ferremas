import Slider from '../components/Slider';
import Oferta from '../components/Oferta';
import { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

function Index() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('User ID:', user);
    }
  }, [user]);
  
  return (
    <div>
      <Slider />
      <div className="mx-auto lg:w-3/4 xl:w-2/3 px-4 mt-5">
        <br></br>
        <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
          Ofertas de la semana en Ferremas
        </h3>
        <Oferta />
        <br></br>
        <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
          Más comprados
        </h3>
        <Oferta />
      </div>
    </div>
  );
}

export default Index;
