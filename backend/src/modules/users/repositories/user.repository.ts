import { NextFunction } from 'express'
import { Knex } from 'knex'
import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from '../interfaces/user.interface'
import { IUserRepository } from '../interfaces/user-repository.interface'
import AppError from '../../../core/errors/app-error'
import { HTTP_STATUS } from '../../../config'
import { isPostgresError } from '../../../core/errors/database-error.types'

export class UserRepository implements IUserRepository {
    private db: Knex
    private readonly tableName = 'users'

    constructor(db: Knex) {
        this.db = db
    }

    async findById(id: number, next: NextFunction): Promise<IUser | void> {
        const user = await this.db(this.tableName).where({ id }).first()

        if (!user) {
            return next(new AppError('Aucun utilisateur correspondant à cet ID.', HTTP_STATUS.NOT_FOUND))
        }

        return user
    }

    async findByEmail(email: string, next: NextFunction): Promise<IUser | void> {
        const user = await this.db(this.tableName).where({ email: email.toLowerCase() }).first()

        if (!user) {
            return next(new AppError('Aucun utilisateur correspondant à cet email.', HTTP_STATUS.NOT_FOUND))
        }

        return user
    }

    async findAll(): Promise<IUser[]> {
        return this.db(this.tableName).select('*').orderBy('created_at', 'desc')
    }

    async create(data: IUserCreationAttributes, next: NextFunction): Promise<IUser | void> {
        try {
            const [user] = await this.db(this.tableName)
                .insert({
                    ...data,
                    email: data.email.toLowerCase(),
                    active: true,
                    must_reset_password: true,
                })
                .returning('*')

            return user
        } catch (error: unknown) {
            if (isPostgresError(error) && error.code === '23505') {
                return next(new AppError('Un utilisateur avec cet email existe déjà.', HTTP_STATUS.CONFLICT))
            }
            return next(error)
        }
    }

    async update(id: number, data: IUserUpdateAttributes, next: NextFunction): Promise<IUser | void> {
        try {
            const [updatedUser] = await this.db(this.tableName).where({ id }).update(data).returning('*')

            if (!updatedUser) {
                return next(new AppError('Aucun utilisateur correspondant à cet ID.', HTTP_STATUS.NOT_FOUND))
            }

            return updatedUser
        } catch (error: unknown) {
            if (isPostgresError(error) && error.code === '23505') {
                return next(new AppError('Un utilisateur avec cet email existe déjà.', HTTP_STATUS.CONFLICT))
            }
            return next(error)
        }
    }

    async delete(id: number, next: NextFunction): Promise<void> {
        const deletedCount = await this.db(this.tableName).where({ id }).delete()

        if (deletedCount === 0) {
            return next(new AppError('Aucun utilisateur correspondant à cet ID.', HTTP_STATUS.NOT_FOUND))
        }
    }

    async activateUser(id: number, updatedBy: number, next: NextFunction): Promise<void> {
        const [user] = await this.db(this.tableName)
            .where({ id })
            .update({
                active: true,
                updated_by: updatedBy,
            })
            .returning('*')

        if (!user) {
            return next(new AppError('Aucun utilisateur correspondant à cet ID.', HTTP_STATUS.NOT_FOUND))
        }
    }

    async deactivateUser(id: number, updatedBy: number, next: NextFunction): Promise<void> {
        const [user] = await this.db(this.tableName)
            .where({ id })
            .update({
                active: false,
                updated_by: updatedBy,
            })
            .returning('*')

        if (!user) {
            return next(new AppError('Aucun utilisateur correspondant à cet ID.', HTTP_STATUS.NOT_FOUND))
        }
    }

    async updatePassword(
        id: number,
        hashedPassword: string,
        updatedBy: number,
        next: NextFunction,
        mustResetPassword: boolean = false,
    ): Promise<void> {
        const [user] = await this.db(this.tableName)
            .where({ id })
            .update({
                password: hashedPassword,
                must_reset_password: mustResetPassword,
                updated_by: updatedBy,
            })
            .returning('*')

        if (!user) {
            return next(new AppError('Aucun utilisateur correspondant à cet ID.', HTTP_STATUS.NOT_FOUND))
        }
    }
}
