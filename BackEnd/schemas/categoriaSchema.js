import { z } from 'zod'

const categoriaSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'No es un nombre',
        required_error: 'Nombre es requerido.'
    }),
    descripcion: z.string().nullable()
})

export function validateCategoria (input) {
    return categoriaSchema.safeParse(input)
}

export function validatePartialCategoria (input) {
    return categoriaSchema.partial().safeParse(input)
}
