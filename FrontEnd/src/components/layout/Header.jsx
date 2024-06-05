import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useCart } from '../CartContext';
import logo from '../../assets/Logo.png';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart } = useCart();

    return (
        <header className="header flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white relative">
            <div className="flex items-center w-full md:w-auto justify-between">
                <div className="logo flex items-center">
                    <img className='img-header w-10 h-10 mr-2' src={logo} alt='logo' />
                    <span className="font-bold uppercase">FerreMas</span>
                </div>

                <div className="buscador flex items-center md:hidden ml-4">
                    <input type="search" placeholder="Buscar..." className="barrabuscar p-2 rounded-l-md" />
                    <button className="bg-white p-2 rounded-r-md">🔍</button>
                </div>

                <button className="md:hidden text-white ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? 'X' : '☰'}
                </button>
            </div>

            <div className={`menu absolute md:static top-full left-0 right-0 md:top-auto md:left-auto md:right-auto bg-gray-800 md:bg-transparent shadow-lg md:shadow-none z-10 md:z-auto ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row md:items-center`}>
                <Link to="/" className="select py-2 px-4 text-center text-white md:text-left md:py-0">Inicio</Link>
                <Link to="/categoria" className="select py-2 px-4 text-center text-white md:text-left md:py-0">Categorías</Link>
                <Link to="/nosotros" className="select py-2 px-4 text-center text-white md:text-left md:py-0">Nosotros</Link>
            </div>

            <div className="hidden md:flex items-center justify-between w-full md:w-auto">
                <Link to="/cliente" className="client1 md:mr-4 mb-4 md:mb-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Hazte Cliente</Link>
                <div className="buscador1 hidden md:flex items-center mb-3 md:mb-0">
                    <input type="search" placeholder="Buscar..." className="barrabuscar p-1 rounded-md" />
                    <button className="butt bg-white p-2 rounded-r-md">🔍</button>
                </div>
                <Link to="/carrito" className="carrito flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                    <ShoppingBagIcon className="h-5 w-5 text-white" />
                    <span className="ml-2">Ver Carrito</span>
                    {cart.length > 0 && (
                        <span className="ml-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </Link>
            </div>

            {isMenuOpen && (
                <div className="flex flex-col items-center md:hidden w-full mt-4">
                    <Link to="/cliente" className="client md:mr-4 mb-4 md:mb-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Hazte Cliente</Link>
                    <div className="buscador1 flex items-center mb-3 md:mb-0">
                        <input type="search" placeholder="Buscar..." className="barrabuscar p-1 rounded-md" />
                        <button className="butt bg-white p-2 rounded-r-md">🔍</button>
                    </div>
                    <Link to="/carrito" className="carrito flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                        <ShoppingBagIcon className="h-5 w-5 text-white" />
                        <span className="ml-2">Ver Carrito</span>
                        {cart.length > 0 && (
                            <span className="ml-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
