import db from '../../../database/connection'
import { Funder, FunderCreateDTO, FunderUpdateDTO } from '../interfaces/Funder'

export const funderRepository = {
    /**
     * Récupère tous les bailleurs de fonds
     */
    async findAll(): Promise<Funder[]> {
        return db('funders').select('*').orderBy('name', 'asc')
    },

    /**
     * Récupère un bailleur de fonds par son ID
     */
    async findById(id: number): Promise<Funder | undefined> {
        return db('funders').where({ id }).first()
    },

    /**
     * Récupère un bailleur de fonds par son nom
     */
    async findByName(name: string): Promise<Funder | undefined> {
        return db('funders').where({ name }).first()
    },

    /**
     * Crée un nouveau bailleur de fonds
     */
    async create(funderData: FunderCreateDTO): Promise<Funder> {
        const [newFunder] = await db('funders').insert(funderData).returning('*')
        return newFunder
    },

    /**
     * Met à jour un bailleur de fonds existant
     */
    async update(id: number, funderData: FunderUpdateDTO): Promise<Funder | null> {
        const [updatedFunder] = await db('funders').where({ id }).update(funderData).returning('*')
        return updatedFunder || null
    },

    /**
     * Supprime un bailleur de fonds
     */
    async delete(id: number): Promise<boolean> {
        const deletedCount = await db('funders').where({ id }).delete()
        return deletedCount > 0
    },

    /**
     * Récupère les bailleurs de fonds par catégorie
     */
    async findByCategory(category: string): Promise<Funder[]> {
        return db('funders').where({ category }).orderBy('name', 'asc')
    },
}
