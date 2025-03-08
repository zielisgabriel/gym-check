import { Router } from 'express'
import { usersRoutes } from './users-routes/users.routes'
import { authenticateRoutes } from './users-routes/authenticate.routes'
import { profileRouter } from './users-routes/profile.routes'
import { createGymRouter } from './gyms-routes/create-gym.routes'
import { searchGymsRouter } from './gyms-routes/search-gym.routes'
import { fetchNearbyGymsRouter } from './gyms-routes/fetch-nearby-gyms.routes'
import { createCheckInRouter } from './check-ins-routes/create-check-ins.routes'
import { historyCheckInsRouter } from './check-ins-routes/history-check-ins.routes'
import { showCheckInsTotalNumberRouter } from './check-ins-routes/show-check-ins-total-number.routes'
import { validateCheckInRouter } from './check-ins-routes/validate-check-in.routes'
import { refreshTokenRouter } from './refresh-token/refresh-token.routes'
import { verifyUserRole } from '@/middlewares/verify-user-role'



const routes = Router()

/** Authenticated */
routes.use("/me", profileRouter)
routes.use("/token/refresh", refreshTokenRouter)


routes.use("/users", usersRoutes)
routes.use("/sessions", authenticateRoutes)


routes.use("/gyms", verifyUserRole('ADMIN'), createGymRouter)
routes.use("/gyms/search", searchGymsRouter)
routes.use("/gyms/nearby", fetchNearbyGymsRouter)


routes.use("/gyms", createCheckInRouter)
routes.use("/check-ins", historyCheckInsRouter)
routes.use("/check-ins", showCheckInsTotalNumberRouter)
routes.use("/check-ins", verifyUserRole('ADMIN'), validateCheckInRouter)

export { routes }