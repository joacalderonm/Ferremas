import Banner from '../assets/banner.png'
import Map from '../assets/map.png'
import '../../node_modules/tailwindcss/lib/css/preflight.css'
import '../css/Styles.css'
function Contacto() {
    return (
       <body>
           <div className="banner">
            <img src={Banner} />          
            </div>
            <div className='contenido-nosotros'>
            <div className='in-fo'>
                <h1>Sobre Nosotros</h1>
                <p>Bienvenidos a FERREMAS, tu distribuidora de confianza para productos de ferretería y construcción en Chile. Con más de cuatro décadas de experiencia en el mercado, nos enorgullece ser parte del crecimiento y desarrollo de la industria de la construcción y ferretería en el país.</p>
                <br></br>
                <h1>Nuestra Historia</h1>
                <p>Desde nuestros inicios en la década de los 80 en la comuna de Santiago, hemos estado comprometidos con proporcionar a nuestros clientes una amplia gama de productos de alta calidad y un servicio excepcional. Con el tiempo, hemos expandido nuestras operaciones, estableciendo cuatro sucursales en la región metropolitana y tres sucursales adicionales en regiones estratégicas, con planes de continuar expandiéndonos para satisfacer las necesidades de nuestros clientes en todo Chile.</p>
                <br></br><h1>Nuestra Misión</h1>
                <p>
En FERREMAS, nuestra misión es ser el socio de confianza de nuestros clientes en la realización de proyectos de construcción y renovación. Nos esforzamos por ofrecer una experiencia de compra conveniente y eficiente, proporcionando productos de calidad, asesoramiento experto y un servicio personalizado.</p>
            <br></br><h1>Nuestro Equípo</h1>
            <p>En FERREMAS, valoramos a nuestro equipo altamente capacitado y comprometido. Cada una de nuestras sucursales cuenta con una estructura organizativa clara, con roles definidos para diferentes tareas, incluyendo administradores, vendedores, bodegueros y contadores. Esto nos permite gestionar de manera eficiente las ventas, pedidos, inventario y finanzas, garantizando un servicio óptimo para nuestros clientes.</p></div><div className='map'>
                <img src={Map} />
            </div>
            
            </div>
            
       </body>
    );
}

export default Contacto; 