import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { technologyController } from './technology.controller' // Import the correct technology controller
import {
  createTechnologyZodSchema,
  updateTechnologyZodSchema,
} from './technology.validation'

const router = Router()

// Create a new technology record
router.post(
  '/',
  zodValidateHandler(createTechnologyZodSchema), // Adjusting the schema validation
  technologyController.insertTechnology,
)

// Get all technology records
router.get('/', technologyController.getAllTechnologies)

// Get a single technology record by ID
router.get('/:id', technologyController.getTechnologyById)

// Update a technology record by ID
router.patch(
  '/:id',
  zodValidateHandler(updateTechnologyZodSchema), // Adjusting the schema validation
  technologyController.updateTechnologyById,
)

// Delete a technology record by ID
router.delete('/:id', technologyController.deleteTechnologyById)

export { router as technologyRouter } // Export the router as technologyRouter
