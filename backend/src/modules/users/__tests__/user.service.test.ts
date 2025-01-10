import { UserService } from '../services/user.service'
import { UserRepository } from '../repositories/user.repository'
import { NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { IUser } from '../interfaces/user.interface'

jest.mock('../repositories/user.repository')
jest.mock('bcryptjs')

describe('UserService', () => {
    let userService: UserService
    let userRepository: jest.Mocked<UserRepository>
    let mockNext: jest.MockedFunction<NextFunction>

    beforeEach(() => {
        userRepository = {
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            activateUser: jest.fn(),
            deactivateUser: jest.fn(),
            updatePassword: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>
        userService = new UserService(userRepository)
        mockNext = jest.fn()
    })

    describe('createUser', () => {
        const createUserDto = {
            username: 'testuser',
            email: 'test@example.com',
            phone: '1234567890',
            department: 'IT',
        }

        it('should create a user successfully', async () => {
            const hashedPassword = 'hashedPassword123'
            const createdUser: IUser = {
                id: 1,
                ...createUserDto,
                password: hashedPassword,
                active: true,
                must_reset_password: true,
                created_by: 1,
                updated_by: null,
                created_at: new Date(),
                updated_at: new Date(),
                authenticated: false,
            }

            ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword)
            userRepository.create.mockResolvedValue(createdUser)

            const result = await userService.createUser(createUserDto, 1, mockNext)

            expect(result).toBeDefined()
            expect(result?.user).toEqual(createdUser)
            expect(result?.temporaryPassword).toBeDefined()
            expect(userRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    ...createUserDto,
                    password: hashedPassword,
                    created_by: 1,
                }),
                mockNext,
            )
        })

        it('should handle invalid email', async () => {
            const invalidUserDto = { ...createUserDto, email: 'invalid-email' }

            await userService.createUser(invalidUserDto, 1, mockNext)

            expect(mockNext).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: 400,
                    message: 'Invalid email format',
                }),
            )
        })
    })

    describe('changePassword', () => {
        const userId = 1
        const currentPassword = 'oldPassword123'
        const newPassword = 'newPassword123!'
        const mockUser: IUser = {
            id: userId,
            username: 'testuser',
            password: 'hashedOldPassword',
            email: 'test@example.com',
            phone: null,
            department: null,
            active: true,
            must_reset_password: false,
            created_by: null,
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
            authenticated: false,
        }

        it('should change password successfully', async () => {
            userRepository.findById.mockResolvedValue(mockUser)
            ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
            ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPassword')

            const result = await userService.changePassword(userId, currentPassword, newPassword, userId, mockNext)

            expect(result).toEqual({ message: 'Password updated successfully' })
            expect(userRepository.updatePassword).toHaveBeenCalledWith(userId, 'hashedNewPassword', userId, mockNext)
        })

        it('should handle incorrect current password', async () => {
            userRepository.findById.mockResolvedValue(mockUser)
            ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

            await userService.changePassword(userId, currentPassword, newPassword, userId, mockNext)

            expect(mockNext).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: 401,
                    message: 'Current password is incorrect',
                }),
            )
        })
    })

    // Tests for UserRepository
    describe('UserRepository', () => {
        let db: any
        let repository: UserRepository

        beforeEach(() => {
            db = {
                select: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                first: jest.fn(),
                insert: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
                returning: jest.fn(),
                orderBy: jest.fn(),
            }
            repository = new UserRepository(db)
        })

        describe('findById', () => {
            it('should find user by id', async () => {
                const mockUser = { id: 1, username: 'test' }
                db.first.mockResolvedValue(mockUser)

                const result = await repository.findById(1, mockNext)

                expect(result).toEqual(mockUser)
                expect(db.where).toHaveBeenCalledWith({ id: 1 })
            })

            it('should handle user not found', async () => {
                db.first.mockResolvedValue(null)

                await repository.findById(1, mockNext)

                expect(mockNext).toHaveBeenCalledWith(
                    expect.objectContaining({
                        statusCode: 404,
                        message: 'Aucun utilisateur correspondant à cet ID.',
                    }),
                )
            })
        })
    })
})
