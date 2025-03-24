// FunderForm/types.ts
import type { Control, FieldErrors } from 'react-hook-form'

export type GeneralFields = {
    name: string
    acronym?: string | null
    description?: string | null
}

export type CategoryFields = {
    category: 'public' | 'private' | 'international'
}

export type ContactFields = {
    country_iso_2?: string | null
    address?: string | null
    contact_name?: string | null
    contact_email?: string | null
    contact_phone?: string | null
}

export type FunderFormSchema = GeneralFields & CategoryFields & ContactFields

export type FormSectionBaseProps = {
    control: Control<FunderFormSchema>
    errors: FieldErrors<FunderFormSchema>
}
