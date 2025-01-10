import { Response } from 'express'
import { HTTP_STATUS } from '../config'
import { ApiResponse, PaginationMeta } from '../types/api-response'

export class ResponseHandler {
    static success<T>(
        res: Response,
        data?: T,
        message?: string,
        meta?: PaginationMeta,
        statusCode: number = HTTP_STATUS.OK,
    ): void {
        const response: ApiResponse<T> = {
            status: 'success',
            message,
            data,
            meta,
        }

        res.status(statusCode).json(response)
    }

    static error(
        res: Response,
        message: string,
        errors?: string[],
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER,
    ): void {
        const response: ApiResponse<null> = {
            status: 'error',
            message,
            errors,
        }

        res.status(statusCode).json(response)
    }

    static created<T>(res: Response, data: T, message: string = 'Resource created successfully'): void {
        this.success(res, data, message, undefined, HTTP_STATUS.CREATED)
    }
}
