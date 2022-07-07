import express from 'express'
import { productosController } from '../controllers/productoController.js'
export const productosRouter = express.Router()



productosRouter.get('/api/productos', productosController.listarAll)
productosRouter.post('/api/productos/', productosController.guardar)
productosRouter.get('/api/productos/:id', productosController.listar)
productosRouter.put('/api/productos/:id', productosController.actualizar)
productosRouter.delete('/api/productos/:id', productosController.borrar)


