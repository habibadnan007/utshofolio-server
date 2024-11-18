import { Router } from 'express'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { experienceController } from './experience.controller' // Ensure this imports the correct experience controller
import {
  createExperienceZodSchema,
  updateExperienceZodSchema,
} from './experience.validation'

const router = Router()

// Create a new experience
router.post(
  '/',
  zodValidateHandler(createExperienceZodSchema), // Adjusting the schema validation
  experienceController.insertExperience,
)

// Get all experiences
router.get('/', experienceController.getAllExperiences)

// Get a single experience by ID
router.get('/:id', experienceController.getExperienceById)

// Update an experience by ID
router.patch(
  '/:id',
  zodValidateHandler(updateExperienceZodSchema), // Adjusting the schema validation
  experienceController.updateExperienceById,
)

// Delete an experience by ID
router.delete('/:id', experienceController.deleteExperienceById)

export { router as experienceRouter }
