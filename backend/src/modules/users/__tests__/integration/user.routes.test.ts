import request from 'supertest'
import express from 'express'
import userRoutes from '../../routes/user.routes'
import { UserService } from '../../services/user.service'
import { authMiddleware } from '../../../../core/middleware/auth.middleware'

jest.mock('../../../../core/middleware/auth.middleware')
jest.mock('../../services/user.service')

describe('User Routes Integration', () => {
    let app: express.Application

    beforeAll(() => {
        app = express()
        app.use(express.json())
        app.use('/api/users', userRoutes)
    })

    beforeEach(() => {
        ;(authMiddleware as jest.Mock).mockImplementation((req, res, next) => next())
    })

    describe('POST /api/users/forgot-password', () => {
        it('should handle forgot password request', async () => {
            const response = await request(app).post('/api/users/forgot-password').send({ email: 'test@example.com' })

            expect(response.status).toBe(200)
        })
    })

    describe('GET /api/users', () => {
        it('should return all users', async () => {
            const response = await request(app).get('/api/users')
            expect(response.status).toBe(200)
            expect(Array.isArray(response.body.data.users)).toBe(true)
        })
    })
})
