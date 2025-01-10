import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'
import { Request, Response } from 'express'
import { IUser } from '../interfaces/user.interface'
import { UserRepository } from '../repositories/user.repository'

jest.mock('../services/user.service')

describe('UserController', () => {
    let userController: UserController
    let userService: jest.Mocked<UserService>
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let mockNext: jest.Mock

    beforeEach(() => {
        // Manually create a mock UserService
        userService = jest.mocked(
            new UserService({
                findById: jest.fn(),
                findByEmail: jest.fn(),
                findAll: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
                activateUser: jest.fn(),
                deactivateUser: jest.fn(),
                updatePassword: jest.fn(),
            }),
        )
        userController = new UserController(userService)

        // Rest of the beforeEach remains the same
        mockRequest = {
            params: {},
            body: {},
            user: {
                id: 1,
                username: 'testuser',
                password: 'hashedpass',
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
            },
        }
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        mockNext = jest.fn()
    })

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const mockUsers: IUser[] = [
                {
                    id: 1,
                    username: 'user1',
                    email: 'user1@example.com',
                    password: 'hashedpass',
                    phone: null,
                    department: null,
                    active: true,
                    must_reset_password: false,
                    created_by: null,
                    updated_by: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                    authenticated: false,
                },
            ]

            userService.findAllUsers.mockResolvedValue(mockUsers)

            await userController.getAllUsers(mockRequest as Request, mockResponse as Response, mockNext)

            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'success',
                data: { users: mockUsers },
            })
        })
    })

    describe('createUser', () => {
        const createUserDto = {
            username: 'newuser',
            email: 'newuser@example.com',
            phone: '1234567890',
            department: 'IT',
        }

        it('should create a user successfully', async () => {
            const mockResult = {
                user: {
                    id: 1,
                    ...createUserDto,
                    password: 'hashedpass',
                    active: true,
                    must_reset_password: true,
                    created_by: 1,
                    updated_by: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                    authenticated: false,
                },
                temporaryPassword: 'tempPass123',
            }

            mockRequest.body = createUserDto
            userService.createUser.mockResolvedValue(mockResult)

            await userController.createUser(mockRequest as Request, mockResponse as Response, mockNext)

            expect(mockResponse.status).toHaveBeenCalledWith(201)
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    status: 'success',
                    data: expect.objectContaining({
                        user: mockResult.user,
                    }),
                }),
            )
        })

        it('should handle unauthenticated user', async () => {
            mockRequest.user = undefined

            await userController.createUser(mockRequest as Request, mockResponse as Response, mockNext)

            expect(mockNext).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: 401,
                    message: 'User not authenticated',
                }),
            )
        })
    })
})
