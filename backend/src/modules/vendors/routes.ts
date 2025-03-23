import express from 'express'
import vendorController from './controllers/vendorController'
import authController from '../../controllers/authController'

const router = express.Router()

// Toutes les routes nécessitent une authentification
router.use(authController.protect)

// Routes pour les fournisseurs
router.route('/').get(vendorController.getAllVendors).post(vendorController.createVendor)

router
    .route('/:id')
    .get(vendorController.getVendorById)
    .put(vendorController.updateVendor)
    .delete(vendorController.deleteVendor)

// Route pour filtrer par type de service
router.get('/service-type/:serviceType', vendorController.getVendorsByServiceType)

export default router
