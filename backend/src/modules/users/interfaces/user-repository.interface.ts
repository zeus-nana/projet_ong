import { NextFunction } from 'express'
import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from './user.interface'

export interface IUserRepository {
    findById(id: number, next: NextFunction): Promise<IUser | void>
    findByEmail(email: string, next: NextFunction): Promise<IUser | void>
    findAll(): Promise<IUser[]>
    create(data: IUserCreationAttributes, next: NextFunction): Promise<IUser | void>
    update(id: number, data: IUserUpdateAttributes, next: NextFunction): Promise<IUser | void>
    delete(id: number, next: NextFunction): Promise<void>
    activateUser(id: number, updatedBy: number, next: NextFunction): Promise<void>
    deactivateUser(id: number, updatedBy: number, next: NextFunction): Promise<void>
    updatePassword(
        id: number,
        hashedPassword: string,
        updatedBy: number,
        next: NextFunction,
        mustResetPassword?: boolean,
    ): Promise<void>
}
