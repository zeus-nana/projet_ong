// src/modules/users/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import AppError from '../../../core/errors/app-error'
import { HTTP_STATUS } from '../../../config'
import sendEmail from '../../../utils/email/sendEmail'
import { catchAsync } from '../../../utils/catchAsync'

export class UserController {
    constructor(private readonly userService: UserService) {}

    getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.userService.findAllUsers()
        res.status(200).json({
            status: 'success',
            data: { users },
        })
    })

    getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.userService.findUserById(Number(req.params.id), next)
        res.status(200).json({
            status: 'success',
            data: { user },
        })
    })

    createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user?.id) {
            return next(new AppError('User not authenticated', HTTP_STATUS.UNAUTHORIZED))
        }

        const createUserDto: CreateUserDto = req.body
        const result = await this.userService.createUser(createUserDto, req.user.id, next)

        // Si next() a été appelé avec une erreur dans le service,
        // result sera undefined et l'erreur sera déjà transmise
        if (!result) return

        const { user, temporaryPassword } = result

        // Envoi optionnel d'email avec le mot de passe temporaire
        let emailSent = true
        try {
            await sendEmail({
                email: user.email,
                subject: 'Votre compte a été créé',
                message: `Bienvenue ! 
Votre compte a été créé avec succès. Voici votre mot de passe temporaire : ${temporaryPassword}
                    
Nous vous recommandons de changer ce mot de passe dès votre première connexion.`,
            })
        } catch (err) {
            console.error("Erreur lors de l'envoi de l'email", err)
            emailSent = false
        }

        res.status(201).json({
            status: 'success',
            data: {
                user,
                message: emailSent
                    ? 'User created successfully and temporary password sent by email'
                    : 'User created successfully but failed to send email with temporary password',
            },
        })
    })

    updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user?.id) {
            return next(new AppError('User not authenticated', HTTP_STATUS.UNAUTHORIZED))
        }

        const updateUserDto: UpdateUserDto = req.body
        const user = await this.userService.updateUser(Number(req.params.id), updateUserDto, req.user.id, next)

        res.status(200).json({
            status: 'success',
            data: { user },
        })
    })

    deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await this.userService.deleteUser(Number(req.params.id), next)
        res.status(204).json({
            status: 'success',
            data: null,
        })
    })

    changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user?.id) {
            return next(new AppError('User not authenticated', HTTP_STATUS.UNAUTHORIZED))
        }

        const { currentPassword, newPassword } = req.body
        const result = await this.userService.changePassword(
            req.user.id,
            currentPassword,
            newPassword,
            req.user.id,
            next,
        )

        res.status(200).json({
            status: 'success',
            data: result,
        })
    })

    forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body
        const result = await this.userService.forgotPassword(email, next)

        // Si next() a été appelé avec une erreur dans le service,
        // result sera undefined et l'erreur sera déjà transmise
        if (!result) return

        const { user, temporaryPassword } = result

        let emailSent = true
        try {
            await sendEmail({
                email: user.email,
                subject: 'Réinitialisation de votre mot de passe',
                message: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2C3E50; border-bottom: 2px solid #3498DB; padding-bottom: 10px;">Réinitialisation de mot de passe</h2>
                    
                    <p style="color: #34495E; font-size: 16px;">Bonjour,</p>
                    
                    <p style="color: #34495E; font-size: 16px;">Vous avez demandé la réinitialisation de votre mot de passe.</p>
                    
                    <div style="background-color: #F8F9FA; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 0; color: #2C3E50;">Votre nouveau mot de passe temporaire :</p>
                        <p style="font-family: monospace; font-size: 24px; color: #3498DB; margin: 10px 0;">${temporaryPassword}</p>
                    </div>
                    
                    <div style="background-color: #FFF3CD; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="color: #856404; margin: 0;">
                            <strong>Important :</strong> Pour des raisons de sécurité, vous devrez changer ce mot de passe lors de votre prochaine connexion.
                        </p>
                    </div>
                    
                    <p style="color: #E74C3C; font-size: 14px;">
                        Si vous n'êtes pas à l'origine de cette demande, veuillez contacter immédiatement le support.
                    </p>
                </div>
                `,
            })
        } catch (err) {
            console.error("Erreur lors de l'envoi de l'email", err)
            emailSent = false
        }

        res.status(200).json({
            status: 'succès',
            message: emailSent
                ? 'Un mot de passe temporaire a été envoyé à votre adresse email.'
                : "La réinitialisation du mot de passe a été effectuée mais l'email n'a pas pu être envoyé. Veuillez contacter le support.",
        })
    })

    resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email, currentPassword, newPassword } = req.body
        const result = await this.userService.resetPassword(email, currentPassword, newPassword, next)

        if (!result) return

        res.status(200).json({
            status: 'succès',
            message: result.message,
        })
    })
}
