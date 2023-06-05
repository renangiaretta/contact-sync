import { z } from 'zod'


export const AddContactSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email('E-mail inválido'),
    phone: z.string(),
})

export type AddContactData = z.infer<typeof AddContactSchema>