import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', authenticateRoutes)

export { routes }