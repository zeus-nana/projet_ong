// src/modules/users/services/user.service.ts
import { NextFunction } from 'express'
import { IUserRepository } from '../interfaces/user-repository.interface'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { IForgotPasswordResult, IResetPasswordResult, IUser } from '../interfaces/user.interface'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import AppError from '../../../core/errors/app-error'
import { HTTP_STATUS } from '../../../config'

export interface CreateUserResult {
    user: IUser
    temporaryPassword: string
}

export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async createUser(
        createUserDto: CreateUserDto,
        createdBy: number,
        next: NextFunction,
    ): Promise<CreateUserResult | void> {
        if (!validator.isEmail(createUserDto.email)) {
            return next(new AppError('Invalid email format', HTTP_STATUS.BAD_REQUEST))
        }

        const temporaryPassword = this.generateTemporaryPassword()
        const hashedPassword = await bcrypt.hash(temporaryPassword, 12)

        const userData = {
            ...createUserDto,
            password: hashedPassword,
            created_by: createdBy,
        }

        const user = await this.userRepository.create(userData, next)

        if (!user) {
            return next(new AppError('Failed to create user', HTTP_STATUS.INTERNAL_SERVER))
        }

        return { user, temporaryPassword }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto, updatedBy: number, next: NextFunction) {
        if (updateUserDto.email && !validator.isEmail(updateUserDto.email)) {
            return next(new AppError('Invalid email format', HTTP_STATUS.BAD_REQUEST))
        }

        const userData = {
            ...updateUserDto,
            updated_by: updatedBy,
        }

        return this.userRepository.update(id, userData, next)
    }

    async deleteUser(id: number, next: NextFunction) {
        return this.userRepository.delete(id, next)
    }

    async findUserById(id: number, next: NextFunction) {
        return this.userRepository.findById(id, next)
    }

    async findAllUsers() {
        return this.userRepository.findAll()
    }

    async changePassword(
        id: number,
        currentPassword: string,
        newPassword: string,
        updatedBy: number,
        next: NextFunction,
    ) {
        const user = await this.userRepository.findById(id, next)

        if (!user) {
            return next(new AppError('User not found', HTTP_STATUS.NOT_FOUND))
        }

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password)
        if (!isPasswordCorrect) {
            return next(new AppError('Current password is incorrect', HTTP_STATUS.UNAUTHORIZED))
        }

        if (!validator.isStrongPassword(newPassword)) {
            return next(new AppError('Password is not strong enough', HTTP_STATUS.BAD_REQUEST))
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)
        await this.userRepository.updatePassword(id, hashedPassword, updatedBy, next)

        return { message: 'Password updated successfully' }
    }

    async forgotPassword(email: string, next: NextFunction): Promise<IForgotPasswordResult | void> {
        if (!validator.isEmail(email)) {
            return next(new AppError('Veuillez fournir une adresse email valide.', HTTP_STATUS.BAD_REQUEST))
        }

        const user = await this.userRepository.findByEmail(email.toLowerCase(), next)
        if (!user) {
            return next(new AppError('Aucun utilisateur trouvé avec cette adresse email.', HTTP_STATUS.NOT_FOUND))
        }

        if (!user.active) {
            return next(new AppError('Ce compte est désactivé. Veuillez contacter le support.', HTTP_STATUS.FORBIDDEN))
        }

        const temporaryPassword = this.generateTemporaryPassword()
        const hashedPassword = await bcrypt.hash(temporaryPassword, 12)

        // On met à jour le mot de passe et on force le reset au prochain login
        await this.userRepository.updatePassword(
            user.id,
            hashedPassword,
            user.id,
            next,
            true, // force must_reset_password
        )

        return { user, temporaryPassword }
    }

    async resetPassword(
        email: string,
        currentPassword: string,
        newPassword: string,
        next: NextFunction,
    ): Promise<IResetPasswordResult | void> {
        if (!validator.isEmail(email)) {
            return next(new AppError('Veuillez fournir une adresse email valide.', HTTP_STATUS.BAD_REQUEST))
        }

        const user = await this.userRepository.findByEmail(email.toLowerCase(), next)
        if (!user) {
            return next(new AppError('Aucun utilisateur trouvé avec cette adresse email.', HTTP_STATUS.NOT_FOUND))
        }

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password)
        if (!isPasswordCorrect) {
            return next(new AppError('Le mot de passe actuel est incorrect.', HTTP_STATUS.UNAUTHORIZED))
        }

        if (!validator.isStrongPassword(newPassword)) {
            return next(new AppError("Le nouveau mot de passe n'est pas assez fort.", HTTP_STATUS.BAD_REQUEST))
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)
        await this.userRepository.updatePassword(user.id, hashedPassword, user.id, next)

        return { message: 'Mot de passe réinitialisé avec succès.' }
    }

    private generateTemporaryPassword(): string {
        const length = 12
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
        const numbers = '0123456789'
        const symbols = '!@#$%^&*'

        const allChars = upperCase + lowerCase + numbers + symbols

        let password = ''
        password += upperCase[Math.floor(Math.random() * upperCase.length)]
        password += lowerCase[Math.floor(Math.random() * lowerCase.length)]
        password += numbers[Math.floor(Math.random() * numbers.length)]
        password += symbols[Math.floor(Math.random() * symbols.length)]

        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)]
        }

        return password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('')
    }
}
