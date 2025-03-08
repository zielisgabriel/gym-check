import { UsersController } from '@/controllers/users/users.controller'
import { Router } from 'express'

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)

export { usersRoutes }