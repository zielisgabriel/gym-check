import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'
import { profileRouter } from './profile.routes'


const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', authenticateRoutes)

/** Authenticated */
routes.use('/me', profileRouter)

export { routes }