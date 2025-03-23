import { z } from 'zod'

// Schema de validation pour la création de vendor
export const createVendorSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(255),
    code: z.string().max(50).nullable().optional(),
    address: z.string().max(255).nullable().optional(),
    phone: z.string().max(50).nullable().optional(),
    email: z.string().email('Email invalide').max(255).nullable().optional(),
    niu: z.string().max(100).nullable().optional(),
    account_number: z.string().max(100).nullable().optional(),
    service_type: z.string().min(2, 'Le type de service doit contenir au moins 2 caractères').max(100),
})

// Schema de validation pour la mise à jour de vendor
export const updateVendorSchema = createVendorSchema.partial()

// Types inférés depuis les schémas
export type CreateVendorDto = z.infer<typeof createVendorSchema>
export type UpdateVendorDto = z.infer<typeof updateVendorSchema>

// Dto pour la réponse
export interface VendorResponseDto {
    id: number
    name: string
    code: string | null
    address: string | null
    phone: string | null
    email: string | null
    niu: string | null
    account_number: string | null
    service_type: string
    created_at: Date
    updated_at: Date
}
