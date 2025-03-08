import { RefreshTokenController } from "@/controllers/users/refresh-token.controller";
import { Router } from "express";

const refreshTokenController = new RefreshTokenController()
const refreshTokenRouter = Router()

refreshTokenRouter.patch("/", refreshTokenController.refresh)

export { refreshTokenRouter }