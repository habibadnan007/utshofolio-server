import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { educationController } from './education.controller' // Import the correct education controller
import {
  createEducationZodSchema,
  updateEducationZodSchema,
} from './education.validation'
const router = Router()

// Create a new education record
router.post(
  '/',
  zodValidateHandler(createEducationZodSchema), // Adjusting the schema validation
  educationController.insertEducation,
)

// Get all education records
router.get('/', educationController.getAllEducations)

// Get a single education record by ID
router.get('/:id', educationController.getEducationById)

// Update an education record by ID
router.patch(
  '/:id',
  zodValidateHandler(updateEducationZodSchema), // Adjusting the schema validation
  educationController.updateEducationById,
)

// Delete an education record by ID
router.delete('/:id', educationController.deleteEducationById)

export { router as educationRouter }
