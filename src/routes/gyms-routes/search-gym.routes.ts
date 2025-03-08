import { SearchGymsController } from "@/controllers/gyms/search-gyms.controller";
import { Router } from "express";

const searchGymsRouter = Router()
const searchGymsController = new SearchGymsController()

searchGymsRouter.get("/", searchGymsController.searchGyms)

export { searchGymsRouter }