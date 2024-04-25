import '../css/Ofertas.css'

export const Ofertas = () => {
  // Supongamos que tienes un array de ofertas con la siguiente estructura:
  const ofertas = [
    {
      id: 1,
      producto: 'Martillo',
      precio: '$10.99',
      imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain',
      car:'Añadir cesta'
    },
    {
      id: 2,
      producto: 'Destornillador',
      precio: '$5.99',
      imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain',
      car:'Añadir cesta'
    },
    {
        id: 3,
        producto: 'Destornillador',
        precio: '$5.99',
        imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain',
        car:'Añadir cesta'
      },
      {
        id: 4   ,
        producto: 'Destornillador',
        precio: '$5.99',
        imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain',
        car:'Añadir cesta'
      },
      {
        id: 4   ,
        producto: 'Destornillador',
        precio: '$5.99',
        imagen: 'https://th.bing.com/th/id/OIP.wmF36g1cPhKS7kHFLhmJCAHaHa?rs=1&pid=ImgDetMain',
        car:'Añadir cesta'
      }
    // Puedes agregar más ofertas aquí...
  ];

  return (
    <div className="ofertas-semana">
      <h2>Ofertas de la Semana</h2>
      <div className="cards-container">
        {ofertas.map(oferta => (
          <div key={oferta.id} className="card">
            <img src={oferta.imagen} alt={oferta.producto} />
            <div className="info">
              <h3>{oferta.producto}</h3>
              <p>{oferta.precio}</p>
              <button>{oferta.car}</button>
              {/* Puedes agregar más detalles aquí si lo deseas */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

