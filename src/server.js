import express from 'express'
import { Server } from 'http'
import { productosRouter } from './routers/productosRouter.js'
import { carritosRouter }  from './routers/carritosRouter.js'

const app = express()
import bodyParser from "body-parser";
const httpServer = new Server(app)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(productosRouter)
app.use(carritosRouter)


const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`)
})


