import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useCart } from '../CartContext';
import logo from '../../assets/Logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  return (
    <>
      <header className="header flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white relative">
        <div className="flex items-center w-full md:w-auto justify-between">
          <div className="logo flex items-center">
            <img className='img-header w-10 h-10 mr-2' src={logo} alt='logo' />
            <span className="font-bold uppercase">FerreMas</span>
          </div>

          <div className="buscador flex items-center md:hidden ml-3">
            <input type="search" placeholder="Buscar..." className="barrabuscar p-2 rounded-l-md" />
            <button className="bg-white p-2 rounded-r-md">🔍</button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto">
          <div className={`menu flex-col md:flex-row flex w-full md:items-center md:static absolute top-full left-0 md:top-auto md:left-auto bg-gray-100 md:bg-transparent shadow-lg md:shadow-none z-10 md:z-auto ${isMenuOpen ? 'flex' : 'hidden'}`}>
            <Link to="/" className="select py-2 px-4 text-left text-white md:text-left md:py-0">Inicio</Link>
            <Link to="/categoria" className="select py-2 px-4 text-left text-white md:text-left md:py-0">Categorías</Link>
            <Link to="/nosotros" className="select py-2 px-4 text-left text-white md:text-left md:py-0">Nosotros</Link>
          </div>

          <div className="buscador1 hidden md:flex items-center mb-3 md:mb-0">
            <input type="search" placeholder="Buscar..." className="barrabuscar p-1 rounded-l-md" />
            <button className="butt bg-white p-2 rounded-r-md">🔍</button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0">
          <button className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? 'X' : '☰'}
          </button>
          <div className="carrito flex items-center bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
            <Link to="/carrito" className="flex items-center">
              <ShoppingBagIcon className="h-5 w-5 text-white" />
              <span className="ml-2">Ver Carrito</span>
              {cart.length > 0 && (
                <span className="ml-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
