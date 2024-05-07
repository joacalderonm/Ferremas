import { randomUUID } from 'node:crypto'
import { readJSON } from "../../utils.js";

const ferremas = readJSON('./ferremas.json')

export class FerremasModel {

    static async getAll ( {nombre} ) {
        if (nombre) {
            return ferremas.filter(
                ferrema => ferrema.nombre.some(g => g.toLowerCase() === nombre.toLowerCase())
            )
        }
        return ferremas
    }

    static async getById ({ id }) {
        const ferrema = ferremas.find(ferrema => ferrema.id === id)
        return ferrema
    }

    static async create ({ input }) {
        const newFerremas = {
            id: randomUUID(),
            ... input
        }

        ferremas.push(newFerremas)

        return newFerremas
    }

    static async delete ({ id }) {
        const ferremaIndex = ferremas.findIndex(ferrema => ferrema.id === id)
        if (ferremaIndex === -1) return false

        ferremas.splice(ferremaIndex, 1)
        return true
    }

    static async update ({ id, input }) {
        const ferremaIndex = ferremas.findIndex(ferrema => ferrema.id === id)
        if (ferremaIndex === -1 ) return false 

        ferremas[ferremaIndex] = {
            ...ferremas[ferremaIndex],
            ...input
        }

        return ferremas[ferremaIndex]
    }
}