import db from '../../../database/connection'
import { Vendor, VendorCreateDTO, VendorUpdateDTO } from '../interfaces/Vendor'

export const vendorRepository = {
    /**
     * Récupère tous les fournisseurs
     */
    async findAll(): Promise<Vendor[]> {
        return db('vendors').select('*').orderBy('name', 'asc')
    },

    /**
     * Récupère un fournisseur par son ID
     */
    async findById(id: number): Promise<Vendor | undefined> {
        return db('vendors').where({ id }).first()
    },

    /**
     * Récupère un fournisseur par son nom
     */
    async findByName(name: string): Promise<Vendor | undefined> {
        return db('vendors').where({ name }).first()
    },

    /**
     * Crée un nouveau fournisseur
     */
    async create(vendorData: VendorCreateDTO): Promise<Vendor> {
        const [newVendor] = await db('vendors').insert(vendorData).returning('*')
        return newVendor
    },

    /**
     * Met à jour un fournisseur existant
     */
    async update(id: number, vendorData: VendorUpdateDTO): Promise<Vendor | null> {
        const [updatedVendor] = await db('vendors').where({ id }).update(vendorData).returning('*')
        return updatedVendor || null
    },

    /**
     * Supprime un fournisseur
     */
    async delete(id: number): Promise<boolean> {
        const deletedCount = await db('vendors').where({ id }).delete()
        return deletedCount > 0
    },

    /**
     * Récupère les fournisseurs par type de service
     */
    async findByServiceType(serviceType: string): Promise<Vendor[]> {
        return db('vendors').where({ service_type: serviceType }).orderBy('name', 'asc')
    },

    /**
     * Récupère les fournisseurs par son code
     */
    async findByCode(code: string): Promise<Vendor | undefined> {
        return db('vendors').where({ code }).first()
    },
}
