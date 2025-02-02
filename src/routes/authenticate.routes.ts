import { Router } from "express";
import { AuthenticateController } from "@/controllers/authenticate.controller";

const authenticateController = new AuthenticateController()
const authenticateRoutes = Router()

authenticateRoutes.post('/', authenticateController.create)

export { authenticateRoutes }