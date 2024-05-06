import React, { useState, useEffect } from 'react';
import '../css/Styles.css';
import { MagnifyingGlassCircleIcon, UserIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/solid';
import logo from '../assets/LogoFerremas.png';

export const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar la visibilidad del Sidebar

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Función para alternar la visibilidad del Sidebar
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Verificar si el clic fue fuera del sidebar y si el sidebar está abierto
      if (isSidebarOpen && !document.querySelector('.Sidebar').contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    // Añadir y remover el manejador de eventos
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isSidebarOpen]); // Depende del estado de isSidebarOpen

  return (
    <header className="header">
      <div className='img-logo'>
        <img src={logo} alt="logo"/>
      </div>
      <div className='allbox'>
      <div className="search-bar">
  <input type="search" placeholder="Buscar..." className="px-1 py-1 bg-black text-white focus:outline-none" />
  <button className="search-button">
    <MagnifyingGlassCircleIcon className="icon-size"/>
  </button>
</div>

        <div className="flex space-x-10">
          <button className=''>
            <UserIcon className="h-6 w-6 text-black"/> {/* Placeholder para el primer icono */}
          </button>
          <button>
            <HeartIcon className="h-6 w-6 text-gray"/> {/* Placeholder para el segundo icono */}
          </button>
          <button>
            <ShoppingCartIcon className="h-6 w-6 text-gray"/> {/* Placeholder para el tercer icono */}
          </button>
        </div>
      </div>
      <div className='buttons'>
  <button onClick={toggleSidebar} className="menu-button1"> Menu Categorias</button>
  <button className="menu-button">Nosotros</button>
  <button className="menu-button">Ofertas</button>
</div>

      <div className={isSidebarOpen ? "Sidebar open" : "Sidebar"}>
        <a href="/" className="textsidebar">Inicio</a>
        <a href="/categorías" className="textsidebar">Categorías</a>
        <a href="/nosotros" className="textsidebar">Nosotros</a>
      </div>
    </header>
  );
}
