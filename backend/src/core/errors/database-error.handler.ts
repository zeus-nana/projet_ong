import { HTTP_STATUS } from '../../config'
import { PostgresError } from './database-error.types'

interface DatabaseErrorResponse {
    statusCode: number
    message: string
}

export function handlePostgresError(error: PostgresError): DatabaseErrorResponse {
    switch (error.code) {
        case '23505': // unique_violation
            return {
                statusCode: HTTP_STATUS.CONFLICT,
                message: 'Duplicate key value violates unique constraint.',
            }
        case '23503': // foreign_key_violation
            return {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: 'Foreign key constraint violation.',
            }
        case '23502': // not_null_violation
            return {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: 'Not Null constraint violation.',
            }
        case '42P01': // undefined_table
            return {
                statusCode: HTTP_STATUS.INTERNAL_SERVER,
                message: 'The specified table does not exist.',
            }
        case '42703': // undefined_column
            return {
                statusCode: HTTP_STATUS.INTERNAL_SERVER,
                message: 'Undefined column.',
            }
        case '28P01': // invalid_password
            return {
                statusCode: HTTP_STATUS.UNAUTHORIZED,
                message: 'Cannot connect to database. Invalid password.',
            }
        case '53300': // too_many_connections
            return {
                statusCode: HTTP_STATUS.SERVICE_UNAVAILABLE,
                message: 'Too many connections. Please try again later.',
            }
        case '22P02': // not an integer exception
            return {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: 'Not an integer exception.',
            }
        default:
            return {
                statusCode: HTTP_STATUS.INTERNAL_SERVER,
                message: 'An database error has occurred.',
            }
    }
}
