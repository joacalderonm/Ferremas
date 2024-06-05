import '../../css/Styles.css'
import { Link } from 'react-router-dom';

export const Footer = () => {
    return ( 
        <footer className="bg-gray-700 text-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="footer-section">
            <h2 className="text-lg font-bold mb-2">Enlaces</h2>
            <ul className="list-none p-0 m-0">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/categoria">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="text-lg font-bold mb-2">Redes Sociales</h2>
            <ul className="list-none p-0 m-0">
              <li><a href="https://facebook.com">Facebook</a></li>
              <li><a href="https://twitter.com">Twitter</a></li>
              <li><a href="https://instagram.com">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="text-lg font-bold mb-2">Contacto</h2>
            <p>Dirección: 123 Egaña 23, Puerto Montt, Chile</p>
            <p>Email: somosferremascl@gail.com</p>
            <p>Teléfono: +569 98098789</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
     );
}
