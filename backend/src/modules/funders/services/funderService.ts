import { Funder, FunderCreateDTO, FunderUpdateDTO, FunderValidationResult } from '../interfaces/Funder'
import { funderRepository } from '../repositories/funderRepository'
import { CreateFunderDto, UpdateFunderDto } from '../dto/funderDto'
import AppError from '../../../utils/appError'
import { HTTP_STATUS } from '../../../config'
import validator from 'validator'

export const funderService = {
    /**
     * Récupère tous les bailleurs de fonds
     */
    async getAllFunders(): Promise<Funder[]> {
        return funderRepository.findAll()
    },

    /**
     * Récupère un bailleur de fonds par son ID
     */
    async getFunderById(id: number): Promise<Funder> {
        const funder = await funderRepository.findById(id)
        if (!funder) {
            throw new AppError('Bailleur de fonds non trouvé', HTTP_STATUS.NOT_FOUND)
        }
        return funder
    },

    /**
     * Crée un nouveau bailleur de fonds
     */
    async createFunder(funderData: CreateFunderDto, userId: number): Promise<Funder> {
        // Vérifier si un bailleur avec le même nom existe déjà
        const existingFunder = await funderRepository.findByName(funderData.name)
        if (existingFunder) {
            throw new AppError('Un bailleur de fonds avec ce nom existe déjà', HTTP_STATUS.CONFLICT)
        }

        // Validation
        const validationResult = await this.validateFunder(funderData)
        if (!validationResult.isValid) {
            throw new AppError(validationResult.message, HTTP_STATUS.BAD_REQUEST)
        }

        // Convertir tous les undefined en null
        const sanitizedData = Object.fromEntries(
            Object.entries(funderData).map(([key, value]) => [key, value === undefined ? null : value]),
        )

        // Création du bailleur
        return funderRepository.create({
            ...sanitizedData,
            created_by: userId,
        } as FunderCreateDTO)
    },

    /**
     * Met à jour un bailleur de fonds existant
     */
    async updateFunder(id: number, funderData: UpdateFunderDto, userId: number): Promise<Funder> {
        // Vérifier si le bailleur existe
        const existingFunder = await funderRepository.findById(id)
        if (!existingFunder) {
            throw new AppError('Bailleur de fonds non trouvé', HTTP_STATUS.NOT_FOUND)
        }

        // Si le nom est modifié, vérifier l'unicité
        if (funderData.name && funderData.name !== existingFunder.name) {
            const funderWithSameName = await funderRepository.findByName(funderData.name)
            if (funderWithSameName) {
                throw new AppError('Un bailleur de fonds avec ce nom existe déjà', HTTP_STATUS.CONFLICT)
            }
        }

        // Validation
        const validationResult = await this.validateFunder(funderData, true)
        if (!validationResult.isValid) {
            throw new AppError(validationResult.message, HTTP_STATUS.BAD_REQUEST)
        }

        // Convertir tous les undefined en null
        const sanitizedData = Object.fromEntries(
            Object.entries(funderData).map(([key, value]) => [key, value === undefined ? null : value]),
        )

        // Mise à jour
        const updatedFunder = await funderRepository.update(id, {
            ...sanitizedData,
            updated_by: userId,
        } as FunderUpdateDTO)

        if (!updatedFunder) {
            throw new AppError('Erreur lors de la mise à jour du bailleur de fonds', HTTP_STATUS.INTERNAL_SERVER)
        }

        return updatedFunder
    },

    /**
     * Supprime un bailleur de fonds
     */
    async deleteFunder(id: number): Promise<void> {
        const funder = await funderRepository.findById(id)
        if (!funder) {
            throw new AppError('Bailleur de fonds non trouvé', HTTP_STATUS.NOT_FOUND)
        }

        const deleted = await funderRepository.delete(id)
        if (!deleted) {
            throw new AppError('Erreur lors de la suppression du bailleur de fonds', HTTP_STATUS.INTERNAL_SERVER)
        }
    },

    /**
     * Récupère les bailleurs de fonds par catégorie
     */
    async getFundersByCategory(category: string): Promise<Funder[]> {
        if (!['public', 'private', 'international'].includes(category)) {
            throw new AppError('Catégorie invalide', HTTP_STATUS.BAD_REQUEST)
        }
        return funderRepository.findByCategory(category)
    },

    /**
     * Valide les données du bailleur de fonds
     */
    async validateFunder(data: CreateFunderDto | UpdateFunderDto, isUpdate = false): Promise<FunderValidationResult> {
        // Vérification du nom pour la création
        if (!isUpdate && !data.name) {
            return {
                isValid: false,
                message: 'Le nom du bailleur de fonds est requis',
            }
        }

        // Vérification de la longueur du nom
        if (data.name && !validator.isLength(data.name, { min: 2, max: 255 })) {
            return {
                isValid: false,
                message: 'Le nom doit contenir entre 2 et 255 caractères',
            }
        }

        // Vérification de la catégorie
        if (data.category && !['public', 'private', 'international'].includes(data.category)) {
            return {
                isValid: false,
                message: 'La catégorie doit être "public", "private" ou "international"',
            }
        }

        // Vérification du code ISO du pays
        if (data.country_iso_2 && !validator.isLength(data.country_iso_2, { min: 2, max: 2 })) {
            return {
                isValid: false,
                message: 'Le code ISO du pays doit être composé de 2 caractères',
            }
        }

        // Vérification de l'email
        if (data.contact_email && !validator.isEmail(data.contact_email)) {
            return {
                isValid: false,
                message: 'Format email invalide',
            }
        }

        return { isValid: true, message: '' }
    },
}
