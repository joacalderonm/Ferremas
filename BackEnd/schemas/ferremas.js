import z from 'zod';

const ferremasSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'No es un nombre',
        required_error: 'Nombre es requerido.'
    }),
    descripcion: z.string().nullable(),
    precio: z.number({
        invalid_type_error: 'El precio debe ser un número decimal positivo',
        required_error: 'El precio es requerido.'
    }).positive(),
    stock: z.number({
        invalid_type_error: 'El stock debe ser un número entero no negativo',
        required_error: 'El stock es requerido.'
    }).nonnegative(),
    categoriaID: z.number().int().positive().nullable()
});

export function validateFerremas(input) {
    return ferremasSchema.safeParse(input);
}

export function validatePartialFerremas(input) {
    return ferremasSchema.partial().safeParse(input);
}
