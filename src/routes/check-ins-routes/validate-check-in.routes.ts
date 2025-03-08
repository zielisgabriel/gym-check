import { ValidateCheckInController } from "@/controllers/check-ins/validate-check-in.controller";
import { Router } from "express";

const validateCheckInRouter = Router()
const validateCheckInController = new ValidateCheckInController()

validateCheckInRouter.patch("/:checkInId/validate", validateCheckInController.validate)

export { validateCheckInRouter }