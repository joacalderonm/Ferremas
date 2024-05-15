import '../css/Styles.css'
import { MagnifyingGlassCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'; // Asegúrate de tener Heroicons instalados
import logo from '../assets/Logo.png'


export const Header = () => {
    return (
        <header className="header ">
        
          {/* Logo y nombre de la tienda */}
          <div className="logo">
          
          <img className='img-header' src={logo} alt='logo'/>
             <span className="font-bold uppercase">FerreMas</span>
          </div>
    
          {/* Navegación */}
          <div className="menu">
            <a href="/" className="select">Inicio</a>
            <a href="/categoria" className="select">Categorías</a>
            <a href="/nosotros" className="select">Nosotros</a>
            
          </div>
     <a href="/cliente" className="client">Hazte Cliente</a>

          <div className="buscador">
          
              <input type="search" placeholder="Buscar..." className="barrabuscar" />
              
              <MagnifyingGlassCircleIcon className="MagnifyingGlassCircleIcon"/>
          
            </div>

            <button className="carrito">
                <div className='hidden md:flex items-center'>
                    <ShoppingBagIcon className="h-5 w-5 text-white"/>
                    <span className="ml-2">Ver Carrito</span>
                </div>
                <div className="md:hidden">
                    <ShoppingBagIcon className="h-5 w-5 text-white"/>
                </div>
            </button>
         
        </header>
      );
}