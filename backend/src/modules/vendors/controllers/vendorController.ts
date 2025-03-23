import { Request, Response, NextFunction } from 'express'
import { catchAsync } from '../../../utils/catchAsync'
import { vendorService } from '../services/vendorService'
import { createVendorSchema, updateVendorSchema } from '../dto/vendorDto'
import AppError from '../../../utils/appError'
import { HTTP_STATUS } from '../../../config'

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
    const vendors = await vendorService.getAllVendors()

    return res.status(200).json({
        status: 'succès',
        results: vendors.length,
        data: {
            vendors,
        },
    })
})

const getVendorById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = Number(req.params.id)

    if (isNaN(vendorId)) {
        return next(new AppError('ID de fournisseur invalide', HTTP_STATUS.BAD_REQUEST))
    }

    const vendor = await vendorService.getVendorById(vendorId)

    return res.status(200).json({
        status: 'succès',
        data: {
            vendor,
        },
    })
})

const createVendor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Validation avec Zod
    const validationResult = createVendorSchema.safeParse(req.body)

    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join(', ')

        return next(new AppError(errorMessage, HTTP_STATUS.BAD_REQUEST))
    }

    const newVendor = await vendorService.createVendor(validationResult.data, req.user!.id)

    return res.status(201).json({
        status: 'succès',
        message: 'Fournisseur créé avec succès',
        data: {
            vendor: newVendor,
        },
    })
})

const updateVendor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = Number(req.params.id)

    if (isNaN(vendorId)) {
        return next(new AppError('ID de fournisseur invalide', HTTP_STATUS.BAD_REQUEST))
    }

    // Validation avec Zod
    const validationResult = updateVendorSchema.safeParse(req.body)

    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join(', ')

        return next(new AppError(errorMessage, HTTP_STATUS.BAD_REQUEST))
    }

    const updatedVendor = await vendorService.updateVendor(vendorId, validationResult.data, req.user!.id)

    return res.status(200).json({
        status: 'succès',
        message: 'Fournisseur mis à jour avec succès',
        data: {
            vendor: updatedVendor,
        },
    })
})

const deleteVendor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = Number(req.params.id)

    if (isNaN(vendorId)) {
        return next(new AppError('ID de fournisseur invalide', HTTP_STATUS.BAD_REQUEST))
    }

    await vendorService.deleteVendor(vendorId)

    return res.status(200).json({
        status: 'succès',
        message: 'Fournisseur supprimé avec succès',
    })
})

const getVendorsByServiceType = catchAsync(async (req: Request, res: Response) => {
    const { serviceType } = req.params

    const vendors = await vendorService.getVendorsByServiceType(serviceType)

    return res.status(200).json({
        status: 'succès',
        results: vendors.length,
        data: {
            vendors,
        },
    })
})

export default {
    getAllVendors,
    getVendorById,
    createVendor,
    updateVendor,
    deleteVendor,
    getVendorsByServiceType,
}
