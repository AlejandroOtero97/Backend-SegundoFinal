import express from 'express'
import { carritoController } from '../controllers/carritoController.js'


export const carritosRouter = express.Router()


carritosRouter.get('/api/carritos', carritoController.listarAll)
carritosRouter.post('/api/carritos/', carritoController.guardar)
carritosRouter.delete('/api/carritos/:id', carritoController.borrar)
carritosRouter.get('/api/carritos/:id/productos', carritoController.listar)
carritosRouter.put('/api/carritos/:id/productos', carritoController.actualizar)
carritosRouter.delete('/api/carritos/:id/productos/:idProd', carritoController.borrarOne)



