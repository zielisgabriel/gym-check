import { HistoryCheckInsController } from "@/controllers/check-ins/history-check-ins.controller";
import { Router } from "express";

const historyCheckInsRouter = Router()
const historyCheckInsController = new HistoryCheckInsController()

historyCheckInsRouter.get("/:userId/history", historyCheckInsController.history)

export { historyCheckInsRouter }