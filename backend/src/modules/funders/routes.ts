import express from 'express'
import funderController from './controllers/funderController'
import authController from '../../controllers/authController'

const router = express.Router()

// Toutes les routes nécessitent une authentification
router.use(authController.protect)

// Routes pour les bailleurs de fonds
router.route('/').get(funderController.getAllFunders).post(funderController.createFunder)

router
    .route('/:id')
    .get(funderController.getFunderById)
    .put(funderController.updateFunder)
    .delete(funderController.deleteFunder)

// Route pour filtrer par catégorie
router.get('/category/:category', funderController.getFundersByCategory)

export default router
