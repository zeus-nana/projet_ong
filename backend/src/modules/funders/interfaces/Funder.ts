export interface Funder {
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
    created_by: number
    updated_by: number | null
    created_at: Date
    updated_at: Date
}

export type FunderCreateDTO = Omit<Funder, 'id' | 'created_at' | 'updated_at' | 'updated_by'>

export type FunderUpdateDTO = Omit<Funder, 'id' | 'created_at' | 'updated_at' | 'created_by'>

export interface FunderValidationResult {
    isValid: boolean
    message: string
}
