
import { Link } from 'react-router-dom';

export const Footer = () => {
    return ( 
      
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Columna 1 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Enlaces</h3>
                <ul>
                 <Link to="/" className="text-white hover:text-white">Inicio</Link>
                 <br></br>
                 <Link to="/categoria" className="text-white hover:text-white">Categorias</Link>
                 <br></br>
                 <Link to="/nosotros" className="text-white hover:text-white">Nosotros</Link>
                </ul>
              </div>
              {/* Columna 2 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Contacto</h3>
                <p>Dirección: Egaña 34, Puerto Montt, Chile</p>
                <p>Teléfono:+569 098909087</p>
                <p>Email: somosferremascl@gmail.com</p>
              </div>
              {/* Columna 3 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Síguenos</h3>
                <ul className="flex space-x-4">
                  <li>Facebook</li>
                  <li>Instagram</li>
                  <li>WhatSapp</li>
                  <li>Linkedin</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
     );
}
