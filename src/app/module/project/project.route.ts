import zodValidateHandler from '../../middleware/zodValidateHandler'
import { projectController } from './project.controller'
import { NextFunction, Request, Response, Router } from 'express'
import { upload } from '../../utils/uploadImgToCloudinary'
import {
  createProjectZodSchema,
  updateProjectZodSchema,
} from './project.validation'

const router = Router()

// Create a new project
router.post(
  '/',
  upload.fields([{ name: 'logo' }, { name: 'banner' }]), // Adjusting for multiple file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  },
  zodValidateHandler(createProjectZodSchema),
  projectController.insertProject,
)

// Get all projects
router.get('/', projectController.getAllProjects)

// Get a single project by ID
router.get('/:id', projectController.getProjectById)

// Update a project by ID
router.patch(
  '/:id',
  upload.fields([{ name: 'logo' }, { name: 'banner' }]), // Adjusting for multiple file uploads
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  },
  zodValidateHandler(updateProjectZodSchema),
  projectController.updateProjectById,
)

// Delete a project by ID
router.delete('/:id', projectController.deleteProjectById)

export { router as projectRouter }
