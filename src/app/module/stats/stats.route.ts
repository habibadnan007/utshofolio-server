import { Router } from 'express'
import { statsControllers } from './stats.controller'

const router = Router()

router.get('/', statsControllers.getDashboardStats)

export { router as statsRouter }
