import { z } from 'zod'

// Schema de validation pour la création de funder
export const createFunderSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(255),
    acronym: z.string().max(50).nullable().optional(),
    category: z.enum(['public', 'private', 'international'], {
        errorMap: () => ({ message: 'La catégorie doit être "public", "private" ou "international"' }),
    }),
    country_iso_2: z.string().length(2).nullable().optional(),
    address: z.string().max(255).nullable().optional(),
    contact_name: z.string().max(255).nullable().optional(),
    contact_email: z.string().email('Email invalide').max(255).nullable().optional(),
    contact_phone: z.string().max(50).nullable().optional(),
    description: z.string().nullable().optional(),
})

// Schema de validation pour la mise à jour de funder
export const updateFunderSchema = createFunderSchema.partial()

// Types inférés depuis les schémas
export type CreateFunderDto = z.infer<typeof createFunderSchema>
export type UpdateFunderDto = z.infer<typeof updateFunderSchema>

// Dto pour la réponse
export interface FunderResponseDto {
    id: number
    name: string
    acronym: string | null
    category: 'public' | 'private' | 'international'
    country_iso_2: string | null
    address: string | null
    contact_name: string | null
    contact_email: string | null
    contact_phone: string | null
    description: string | null
    created_at: Date
    updated_at: Date
}
