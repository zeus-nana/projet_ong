// src/modules/users/routes/user.routes.ts
import express from 'express'
import { UserController } from '../controllers/user.controller'
import { authMiddleware } from '../../../core/middleware/auth.middleware'
import { UserService } from '../services/user.service'
import { UserRepository } from '../repositories/user.repository'
import db from '../../../database/connection'

const router = express.Router()
const userRepository = new UserRepository(db)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

router.post('/forgot-password', userController.forgotPassword)
router.post('/reset-password', userController.resetPassword)

// Routes protégées
router.use(authMiddleware)
router.route('/').get(userController.getAllUsers).post(userController.createUser)

router.route('/:id').get(userController.getUserById).put(userController.updateUser).delete(userController.deleteUser)

router.post('/change-password', userController.changePassword)

export default router
