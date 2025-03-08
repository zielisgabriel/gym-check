import { CreateCheckInController } from "@/controllers/check-ins/create-check-in.controller";
import { Router } from "express";

const createCheckInRouter = Router()
const createCheckInController = new CreateCheckInController()

createCheckInRouter.post("/:gymId/check-ins", createCheckInController.create)

export { createCheckInRouter }