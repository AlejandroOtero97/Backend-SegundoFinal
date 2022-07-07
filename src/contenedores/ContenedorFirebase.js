import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error(`No se pudo localizar por ID`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async listarAll() {
        try {
            const listado = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                listado.push({ id: doc.id, ...doc.data() })
            })
            return listado
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async guardar(nuevoElem) {
        try {
            const guardarElem = await this.coleccion.add(nuevoElem);
            return { ...nuevoElem, id: guardarElem.id }
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async actualizar(nuevoElem) {
        try {
            const actualElem = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
            return actualElem
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async borrar(id) {
        try {
            const obj = await this.coleccion.doc(id).delete();
            return obj
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async borrarAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
            // const ref = firestore.collection(path)
            // ref.onSnapshot((snapshot) => {
            //     snapshot.docs.forEach((doc) => {
            //         ref.doc(doc.id).delete()
            //     })
            // })
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async desconectar() {
    }
}

export default ContenedorFirebase