import mongoose from 'mongoose'
import config from '../config.js'
import { 
    removeField, 
    renameField, 
    asPOJO } from '../utils/objectUtils.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            if (docs.length == 0) {
                throw new Error('No se pudo localizar por ID')
            } else {
                const listado = renameField(asPOJO(docs[0]), '_id', 'id')
                return listado
            }
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async listarAll() {
        try {
            let docs = await this.coleccion.find({}, { __v: 0 }).lean()
            docs = docs.map(asPOJO)
            docs = docs.map(e => renameField(e, '_id', 'id'))
            return docs
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async guardar(nuevoElem) {
        try {
            let doc = await this.coleccion.create(nuevoElem);
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async actualizar(nuevoElem) {
        try {
            renameField(nuevoElem, 'id', '_id')
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem)
            if (n == 0 && nModified == 0) {
                throw new Error('Error no encontrado')
            } else {
                renameField(nuevoElem, '_id', 'id')
                removeField(nuevoElem, '__v')
                return asPOJO(nuevoElem)
            }
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async borrar(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 && nDeleted == 0) {
                throw new Error('Error no encontrado')
            }
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
}

export default ContenedorMongoDb