import {productosDao as productosApi} from "../daos/index.js";


export const productosController = {

    listarAll: async (req, res) => {
        const productos = await productosApi.listarAll()
        res.json(productos)
    },
    guardar: async (req, res) => {
        res.json(await productosApi.guardar(req.body))
    },
    listar: async (req, res) => {
        res.json(await productosApi.listar(req.params.id))
    },
    actualizar: async (req, res) => {
        res.json(await productosApi.actualizar(req.body))
    },
    borrar: async (req, res) => {
        res.json(await productosApi.borrar(req.params.id))
    }
}


