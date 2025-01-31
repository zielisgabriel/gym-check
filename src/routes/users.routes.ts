import { UsersController } from '@/controllers/users.controller'
import { Router } from 'express'

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.get('/', usersController.index)
usersRoutes.post('/', usersController.create)

export { usersRoutes }