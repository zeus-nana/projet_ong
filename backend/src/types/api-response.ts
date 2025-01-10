export type ApiStatus = 'success' | 'error'

export interface PaginationMeta {
    page: number
    limit: number
    totalItems: number
    totalPages: number
}

export interface ApiResponse<T> {
    status: ApiStatus
    message?: string
    data?: T
    errors?: string[]
    meta?: PaginationMeta
}
