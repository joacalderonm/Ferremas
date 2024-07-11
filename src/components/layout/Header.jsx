import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useCart } from '../CartContext';
import { useAuth } from '../../auth/AuthContext';  // Importa el contexto de autenticación
import logo from '../../assets/Logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar la visibilidad del dropdown
  const { cart } = useCart();
  const { user, logout } = useAuth();  // Obtén el estado de autenticación y la función de logout
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Cierra el menú cuando se cambia de ruta
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Cierra el menú cuando se hace clic fuera de él
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/resultadobusqueda?query=${encodeURIComponent(searchTerm)}`);
    setSearchTerm(''); // Clear the search input
  };

  // Calcula el total de productos en el carrito
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="header flex flex-col md:flex-row items-center justify-between p-4 bg-gray-900 text-white relative">
        <div className="flex items-center w-full md:w-auto justify-between">
          <div className="logo flex items-center">
            <Link to="/home">
              <img className='img-header w-10 h-10 mr-2' src={logo} alt='logo' />
            </Link>
            <span className="font-bold uppercase">FerreMas</span>
          </div>

          <div className="carrito1 flex items-center bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
            <Link to="/carrito" className="flex items-center">
              <ShoppingBagIcon className="h-5 w-5 text-white" />
              <span className="ml-2">Ver Carrito</span>
              {totalItemsInCart > 0 && (
                <span className="ml-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItemsInCart}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="flex justify-between w-full md:w-auto">
          <div className={`menu flex-col md:flex-row flex w-full md:items-center md:static absolute top-full left-0 md:top-auto md:left-auto bg-gray-700 md:bg-transparent shadow-lg md:shadow-none z-10 md:z-auto ${isMenuOpen ? 'flex' : 'hidden'}`}>
            <Link to="/home" className="select py-2 px-4 text-left font-bold text-white md:text-left md:py-0">Inicio</Link>
            <Link to="/categoria" className="select py-2 px-4 font-bold text-left text-black md:text-left md:py-0">Categorías</Link>
            <Link to="/nosotros" className="select py-2 px-4 font-bold text-left text-black md:text-left md:py-0">Nosotros</Link>
          </div>
        </div>
        <div className="hidden md:flex items-center mb-4 md:mb-0">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en Ferremas"
              className="py-2 px-4 rounded-l bg-gray-200 text-black"
            />
            <button type="submit" className="py-2 px-4 rounded-r bg-red-700 hover:bg-red-800 text-white">
              Buscar
            </button>
          </form>
        </div>
        <div className="flex menu items-center justify-between w-full md:w-auto mt-2 md:mt-3">
          <button className="menu-button text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? 'X' : '☰'}
          </button>
        </div>
        
        <div className="carrito flex items-center bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
          <Link to="/carrito" className="flex items-center">
            <ShoppingBagIcon className="h-5 w-5 text-white" />
            <span className="ml-2">Ver Carrito</span>
            {totalItemsInCart > 0 && (
              <span className="ml-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </div>
        
        {/* Mostrar nombre de usuario si está autenticado */}
        {user ? (
          <div className='relative'>
          <div className='menusito cursor-pointer relative z-50' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className="text-white">{user.username}</span>
            {isDropdownOpen && (
              <div className="des absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link to="/historial" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Mis Compras</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Salir</button>
              </div>
            )}
          </div>
        </div>
        
        ) : (
          <div className="flex items-center ml-4">
            <Link to="/login" className="">
              Ingresar
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
