import '../css/Styles.css'
import logo from '../assets/MockupsFerremas.png';
const HeaderImage = () => {
  return (
    <div className="header-image">
      <img
        src={logo}  
        alt="Imagen 1"
      />
      <div className="img-principal">
       
        <button className="visitar-btn">Visita la tienda</button>
      </div>
    </div>
  );
};

export default HeaderImage;