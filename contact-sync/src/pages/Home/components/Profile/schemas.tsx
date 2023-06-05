import { z } from 'zod'


export const UpdateProfileSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
})

export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>