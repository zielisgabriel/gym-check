import { CreateGymController } from "@/controllers/gyms/create-gym.controller";
import { Router } from "express";

const createGymRouter = Router()
const createGymController = new CreateGymController()

createGymRouter.post("/", createGymController.create)

export { createGymRouter }