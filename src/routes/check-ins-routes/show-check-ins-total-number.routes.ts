import { ShowCheckInsTotalNumberController } from "@/controllers/check-ins/show-check-ins-total-number.controller";
import { Router } from "express";

const showCheckInsTotalNumberRouter = Router()
const showCheckInsTotalNumberController = new ShowCheckInsTotalNumberController()

showCheckInsTotalNumberRouter.get("/:userId/total", showCheckInsTotalNumberController.showTotalNumber)

export { showCheckInsTotalNumberRouter }