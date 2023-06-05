import { z } from 'zod'


export const registerSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().nonempty('Senha obrigatória'),
    first_name: z.string().nonempty('Nome obrigatório'),
    last_name: z.string().nonempty('Sobrenome obrigatório'),
    phone: z.string().nonempty('Telefone obrigatório'),
})

export type RegisterData = z.infer<typeof registerSchema>