export type GetFundersListResponse = {
    status: string
    results: number
    data: {
        funders: Funder[]
    }
}

export type GetFunderResponse = {
    status: string
    data: {
        funder: Funder
    }
}

export type Filter = {
    category: Array<string>
    name: string
}

export type Funder = {
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
