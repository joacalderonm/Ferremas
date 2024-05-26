import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const Breadcrumb = ({ categoria }) => {
  return (
    <nav className="text-md text-gray-500 mb-4">
      <ol className="list-reset flex ">
        <li>
          <Link to="/" className="text-gray-600 hover:underline">Inicio</Link>
        </li>
        <li><span className="mx-2">/</span></li>
        <li>
          <Link to="/categoria" className="text-gray-600 hover:underline">Categorías</Link>
        </li>
        <li><span className="mx-2">/</span></li>
        <li className="font-bold text-gray-900">{categoria}</li>
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
    categoria: propTypes.string.isRequired,
    };

export default Breadcrumb;
