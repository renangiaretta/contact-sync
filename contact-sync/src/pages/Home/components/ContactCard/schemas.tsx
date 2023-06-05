import { z } from 'zod'


export const UpdateContactSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
})

export type UpdateContactData = z.infer<typeof UpdateContactSchema>