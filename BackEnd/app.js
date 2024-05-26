import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { createProductoRouter } from './routes/productoRoute.js';
import { createCategoriaRouter } from './routes/categoriaRoute.js';
import { createMaterialRouter } from './routes/materialRoute.js';
import { createMarcaRouter } from './routes/marcaController.js';

export const createApp = ({ productoModel, categoriaModel, marcaModel, materialModel}) =>{

  const app = express();

  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');
  
  // Montar el router 'ferremas' para manejar todas las rutas relacionadas con 'ferremas'
  app.use('/producto', createProductoRouter ({ productoModel }));
  app.use('/categoria', createCategoriaRouter ({ categoriaModel }));
  app.use('/marca', createMarcaRouter ({ marcaModel }));
  app.use('/material', createMaterialRouter ({ materialModel }));
  
  const PORT = process.env.PORT ?? 1234;
  
  app.listen(PORT, () => {
    console.log(`Server en puerto http://localhost:${PORT}`);
  });
  
}