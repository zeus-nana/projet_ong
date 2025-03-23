import { Request, Response, NextFunction } from 'express'
import { catchAsync } from '../../../utils/catchAsync'
import { funderService } from '../services/funderService'
import { createFunderSchema, updateFunderSchema } from '../dto/funderDto'
import AppError from '../../../utils/appError'
import { HTTP_STATUS } from '../../../config'

const getAllFunders = catchAsync(async (req: Request, res: Response) => {
    const funders = await funderService.getAllFunders()

    return res.status(200).json({
        status: 'succès',
        results: funders.length,
        data: {
            funders,
        },
    })
})

const getFunderById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const funderId = Number(req.params.id)

    if (isNaN(funderId)) {
        return next(new AppError('ID de bailleur de fonds invalide', HTTP_STATUS.BAD_REQUEST))
    }

    const funder = await funderService.getFunderById(funderId)

    return res.status(200).json({
        status: 'succès',
        data: {
            funder,
        },
    })
})

const createFunder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Validation avec Zod
    const validationResult = createFunderSchema.safeParse(req.body)

    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join(', ')

        return next(new AppError(errorMessage, HTTP_STATUS.BAD_REQUEST))
    }

    const newFunder = await funderService.createFunder(validationResult.data, req.user!.id)

    return res.status(201).json({
        status: 'succès',
        message: 'Bailleur de fonds créé avec succès',
        data: {
            funder: newFunder,
        },
    })
})

const updateFunder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const funderId = Number(req.params.id)

    if (isNaN(funderId)) {
        return next(new AppError('ID de bailleur de fonds invalide', HTTP_STATUS.BAD_REQUEST))
    }

    // Validation avec Zod
    const validationResult = updateFunderSchema.safeParse(req.body)

    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join(', ')

        return next(new AppError(errorMessage, HTTP_STATUS.BAD_REQUEST))
    }

    const updatedFunder = await funderService.updateFunder(funderId, validationResult.data, req.user!.id)

    return res.status(200).json({
        status: 'succès',
        message: 'Bailleur de fonds mis à jour avec succès',
        data: {
            funder: updatedFunder,
        },
    })
})

const deleteFunder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const funderId = Number(req.params.id)

    if (isNaN(funderId)) {
        return next(new AppError('ID de bailleur de fonds invalide', HTTP_STATUS.BAD_REQUEST))
    }

    await funderService.deleteFunder(funderId)

    return res.status(200).json({
        status: 'succès',
        message: 'Bailleur de fonds supprimé avec succès',
    })
})

const getFundersByCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.params

    if (!category || !['public', 'private', 'international'].includes(category)) {
        return next(new AppError('Catégorie invalide', HTTP_STATUS.BAD_REQUEST))
    }

    const funders = await funderService.getFundersByCategory(category)

    return res.status(200).json({
        status: 'succès',
        results: funders.length,
        data: {
            funders,
        },
    })
})

export default {
    getAllFunders,
    getFunderById,
    createFunder,
    updateFunder,
    deleteFunder,
    getFundersByCategory,
}
