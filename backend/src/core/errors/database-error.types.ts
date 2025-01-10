export interface PostgresError {
    code: string
    message: string
    detail?: string
    schema?: string
    table?: string
    constraint?: string
}

export function isPostgresError(error: unknown): error is PostgresError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as PostgresError).code === 'string'
    )
}
