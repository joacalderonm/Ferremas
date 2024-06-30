import Banner from '../assets/banner.png'
import Map from '../assets/map.png'
import '../../node_modules/tailwindcss/lib/css/preflight.css'
import '../css/Styles.css'
function Contacto() {
    return (
        <body>
        <div className="banner">
          <img src={Banner} className="w-full h-full object-cover" alt="Banner" />
        </div>
        <div className='contenido-nosotros flex flex-col md:flex-row p-4'>
          <div className='in-fo flex-1 p-1'>
            <h1 className="text-3xl font-bold mb-3">Sobre Nosotros</h1>
            <p className="mb-4">Bienvenidos a FERREMAS, tu distribuidora de confianza para productos de ferretería y construcción en Chile. Con más de cuatro décadas de experiencia en el mercado, nos enorgullece ser parte del crecimiento y desarrollo de la industria de la construcción y ferretería en el país.</p>
            
            <h1 className="text-2xl font-bold mb-4">Nuestra Historia</h1>
            <p className="mb-4">Desde nuestros inicios en la década de los 80 en la comuna de Santiago, hemos estado comprometidos con proporcionar a nuestros clientes una amplia gama de productos de alta calidad y un servicio excepcional. Con el tiempo, hemos expandido nuestras operaciones, estableciendo cuatro sucursales en la región metropolitana y tres sucursales adicionales en regiones estratégicas, con planes de continuar expandiéndonos para satisfacer las necesidades de nuestros clientes en todo Chile.</p>
            
            <h1 className="text-2xl font-bold mb-4">Nuestra Misión</h1>
            <p className="mb-4">En FERREMAS, nuestra misión es ser el socio de confianza de nuestros clientes en la realización de proyectos de construcción y renovación. Nos esforzamos por ofrecer una experiencia de compra conveniente y eficiente, proporcionando productos de calidad, asesoramiento experto y un servicio personalizado.</p>
            
            <h1 className="text-2xl font-bold mb-4">Nuestro Equipo</h1>
            <p>En FERREMAS, valoramos a nuestro equipo altamente capacitado y comprometido. Cada una de nuestras sucursales cuenta con una estructura organizativa clara, con roles definidos para diferentes tareas, incluyendo administradores, vendedores, bodegueros y contadores. Esto nos permite gestionar de manera eficiente las ventas, pedidos, inventario y finanzas, garantizando un servicio óptimo para nuestros clientes.</p>
          </div>
          <div className='map flex-1 p-4'>
            <img src={Map} className="w-full h-auto" alt="Map" />
          </div>
        </div>
      </body>
      
    );
}

export default Contacto; 