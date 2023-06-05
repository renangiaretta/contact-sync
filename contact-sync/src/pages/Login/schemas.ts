import { z } from 'zod'


export const LoginSchema = z.object({
    email: z.string().nonempty('Insira um e-mail').email('Insira um e-mail válido'),
    password: z.string().nonempty('Insira a senha')
})

export type LoginData = z.infer<typeof LoginSchema>