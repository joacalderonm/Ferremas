import { createApp } from './app.js'

import { ProductoModel } from './models/database/productoModel.js'
import { CategoriaModel } from './models/database/categoriaModel.js'

createApp({ productoModel: ProductoModel, categoriaModel: CategoriaModel})