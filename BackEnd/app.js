import express, { json } from 'express';
import { createFerremaRouter } from './routes/ferremas.js';
import { corsMiddleware } from './middlewares/cors.js';

export const createApp = ({ ferremaModel }) =>{

  const app = express();

  // Middleware para parsear JSON en las peticiones entrantes
  app.use(json());
  
  // Aplicación del middleware CORS para permitir peticiones cruzadas
  app.use(corsMiddleware());
  
  // Deshabilitar el encabezado 'X-Powered-By'
  app.disable('x-powered-by');
  
  // Montar el router 'ferremas' para manejar todas las rutas relacionadas con 'ferremas'
  app.use('/ferremas', createFerremaRouter ({ ferremaModel }));
  
  // Establecer el puerto del servidor desde una variable de entorno o usar 1234 como predeterminado
  const PORT = process.env.PORT ?? 1234;
  
  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Server en puerto http://localhost:${PORT}`);
  });
  
}
