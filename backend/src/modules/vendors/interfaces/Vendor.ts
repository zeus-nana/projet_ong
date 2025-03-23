export interface Vendor {
    id: number
    name: string
    code: string | null
    address: string | null
    phone: string | null
    email: string | null
    niu: string | null
    account_number: string | null
    service_type: string
    created_by: number
    updated_by: number | null
    created_at: Date
    updated_at: Date
}

export type VendorCreateDTO = Omit<Vendor, 'id' | 'created_at' | 'updated_at' | 'updated_by'>

export type VendorUpdateDTO = Omit<Vendor, 'id' | 'created_at' | 'updated_at' | 'created_by'>

export interface VendorValidationResult {
    isValid: boolean
    message: string
}
