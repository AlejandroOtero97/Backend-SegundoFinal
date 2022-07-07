import {carritosDao as carritosApi} from "../daos/index.js";


export const carritoController = {

    listarAll: async (req, res) => {
        res.json((await carritosApi.listarAll()).map(c => c.id))
    },
    guardar: async (req, res) => {
        res.json(await carritosApi.guardar())
    },
    listar: async (req, res) => {
        const carrito = await carritosApi.listar(req.params.id)
        res.json(carrito.productos)
    },
    borrarOne: async (req, res) => {
        const carrito = await carritosApi.listar(req.params.id)
        const index = carrito.productos.findIndex(p => p.id === req.params.idProd)
        if (index !== -1) {
            carrito.productos.splice(index, 1)
            await carritosApi.actualizar(carrito)
        }
        res.end()
    },
    actualizar: async (req, res) => {
        const carrito = await carritosApi.listar(req.params.id)
        const producto = await productosApi.listar(req.body.id)
        carrito.productos.push(producto)
        await carritosApi.actualizar(carrito)
        res.end()
    },
    borrar: async (req, res) => {
        res.json(await carritosApi.borrar(req.params.id))
    }
}




