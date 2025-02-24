import { Profile } from "@/controllers/profile.controller";
import { Router } from "express";

const profileController = new Profile()
const profileRouter = Router()

profileRouter.get('/', profileController.show)

export { profileRouter }