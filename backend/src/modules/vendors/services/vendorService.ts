import { Vendor, VendorCreateDTO, VendorUpdateDTO, VendorValidationResult } from '../interfaces/Vendor'
import { vendorRepository } from '../repositories/vendorRepository'
import { CreateVendorDto, UpdateVendorDto } from '../dto/vendorDto'
import AppError from '../../../utils/appError'
import { HTTP_STATUS } from '../../../config'
import validator from 'validator'

export const vendorService = {
    /**
     * Récupère tous les fournisseurs
     */
    async getAllVendors(): Promise<Vendor[]> {
        return vendorRepository.findAll()
    },

    /**
     * Récupère un fournisseur par son ID
     */
    async getVendorById(id: number): Promise<Vendor> {
        const vendor = await vendorRepository.findById(id)
        if (!vendor) {
            throw new AppError('Fournisseur non trouvé', HTTP_STATUS.NOT_FOUND)
        }
        return vendor
    },

    /**
     * Crée un nouveau fournisseur
     */
    async createVendor(vendorData: CreateVendorDto, userId: number): Promise<Vendor> {
        // Vérifier si un fournisseur avec le même nom existe déjà
        const existingVendor = await vendorRepository.findByName(vendorData.name)
        if (existingVendor) {
            throw new AppError('Un fournisseur avec ce nom existe déjà', HTTP_STATUS.CONFLICT)
        }

        // Validation
        const validationResult = await this.validateVendor(vendorData)
        if (!validationResult.isValid) {
            throw new AppError(validationResult.message, HTTP_STATUS.BAD_REQUEST)
        }

        // Convertir tous les undefined en null
        const sanitizedData = Object.fromEntries(
            Object.entries(vendorData).map(([key, value]) => [key, value === undefined ? null : value]),
        )

        // Création du fournisseur
        return vendorRepository.create({
            ...sanitizedData,
            created_by: userId,
        } as VendorCreateDTO)
    },

    /**
     * Met à jour un fournisseur existant
     */
    async updateVendor(id: number, vendorData: UpdateVendorDto, userId: number): Promise<Vendor> {
        // Vérifier si le fournisseur existe
        const existingVendor = await vendorRepository.findById(id)
        if (!existingVendor) {
            throw new AppError('Fournisseur non trouvé', HTTP_STATUS.NOT_FOUND)
        }

        // Si le nom est modifié, vérifier l'unicité
        if (vendorData.name && vendorData.name !== existingVendor.name) {
            const vendorWithSameName = await vendorRepository.findByName(vendorData.name)
            if (vendorWithSameName) {
                throw new AppError('Un fournisseur avec ce nom existe déjà', HTTP_STATUS.CONFLICT)
            }
        }

        // Validation
        const validationResult = await this.validateVendor(vendorData, true)
        if (!validationResult.isValid) {
            throw new AppError(validationResult.message, HTTP_STATUS.BAD_REQUEST)
        }

        // Convertir tous les undefined en null
        const sanitizedData = Object.fromEntries(
            Object.entries(vendorData).map(([key, value]) => [key, value === undefined ? null : value]),
        )

        // Mise à jour
        const updatedVendor = await vendorRepository.update(id, {
            ...sanitizedData,
            updated_by: userId,
        } as VendorUpdateDTO)

        if (!updatedVendor) {
            throw new AppError('Erreur lors de la mise à jour du fournisseur', HTTP_STATUS.INTERNAL_SERVER)
        }

        return updatedVendor
    },

    /**
     * Supprime un fournisseur
     */
    async deleteVendor(id: number): Promise<void> {
        const vendor = await vendorRepository.findById(id)
        if (!vendor) {
            throw new AppError('Fournisseur non trouvé', HTTP_STATUS.NOT_FOUND)
        }

        const deleted = await vendorRepository.delete(id)
        if (!deleted) {
            throw new AppError('Erreur lors de la suppression du fournisseur', HTTP_STATUS.INTERNAL_SERVER)
        }
    },

    /**
     * Récupère les fournisseurs par type de service
     */
    async getVendorsByServiceType(serviceType: string): Promise<Vendor[]> {
        return vendorRepository.findByServiceType(serviceType)
    },

    /**
     * Valide les données du fournisseur
     */
    async validateVendor(data: CreateVendorDto | UpdateVendorDto, isUpdate = false): Promise<VendorValidationResult> {
        // Vérification du nom pour la création
        if (!isUpdate && !data.name) {
            return {
                isValid: false,
                message: 'Le nom du fournisseur est requis',
            }
        }

        // Vérification de la longueur du nom
        if (data.name && !validator.isLength(data.name, { min: 2, max: 255 })) {
            return {
                isValid: false,
                message: 'Le nom doit contenir entre 2 et 255 caractères',
            }
        }

        // Vérification du type de service
        if (!isUpdate && !data.service_type) {
            return {
                isValid: false,
                message: 'Le type de service est requis',
            }
        }

        // Vérification de l'email
        if (data.email && !validator.isEmail(data.email)) {
            return {
                isValid: false,
                message: 'Format email invalide',
            }
        }

        return { isValid: true, message: '' }
    },
}
