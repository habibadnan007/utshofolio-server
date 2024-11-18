import { Router } from 'express'
import { projectRouter } from '../module/project/project.route'
import { experienceRouter } from '../module/experience/experience.route'
import { educationRouter } from '../module/education/education.route'
import { technologyRouter } from '../module/technologies/technology.route'
import { statsRouter } from '../module/stats/stats.route'

const router = Router()
const routes = [
  {
    path: '/project',
    route: projectRouter,
  },
  {
    path: '/experience',
    route: experienceRouter,
  },
  {
    path: '/education',
    route: educationRouter,
  },
  {
    path: '/technology',
    route: technologyRouter,
  },
  {
    path: '/stats',
    route: statsRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
