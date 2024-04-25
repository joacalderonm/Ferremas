import '../css/Header.css'
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react' // Asegúrate de tener Heroicons instalados


export const Header = () => {
    return (
        <header className="bg-black text-white">
          <nav className='lg:container mx-auto flex items-center justify-between p-4'>
          {/* Logo y nombre de la tienda */}
          <div className="flex items-center">
            <div className="text-red-500 mr-2">
              {/* Aquí puedes colocar un icono o imagen para el logo */}
              F
            </div>
            <span className="font-bold uppercase">FerreMas</span>
          </div>
    
          {/* Navegación */}
          <div className="hidden sm:flex space-x-4">
            <a href="/" className="text-red-500 hover:text-red-300">Inicio</a>
            <a href="/categorías" className="hover:text-gray-300">Categorías</a>
            <a href="/nosotros" className="hover:text-gray-300">Nosotros</a>
            <a href="/cliente" className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Hazte Cliente</a>
          </div>
    
          {/* Campo de búsqueda y carrito */}
          <div className="flex items-center">
            <div className="hidden md:flex border-2 border-red-500 rounded overflow-hidden">
              <input type="search" placeholder="Buscar..." className="px-1 py-1 bg-black text-white focus:outline-none" />
              <button className="bg-red-500 px-3 py-1 hover:bg-red-600">
                <SearchIcon className="h-5 w-5 text-white"/>
              </button>
            </div>
            <button className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded flex items-center">
                <div className='hidden md:flex items-center'>
                    <ShoppingBagIcon className="h-5 w-5 text-white"/>
                    <span className="ml-2">Ver Carrito</span>
                </div>
                <div className="md:hidden">
                    <ShoppingBagIcon className="h-5 w-5 text-white"/>
                </div>
            </button>
          </div>
          </nav>
        </header>
      );
}
