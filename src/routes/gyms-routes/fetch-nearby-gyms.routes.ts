import { FetchNearbyGymsController } from "@/controllers/gyms/fetch-nearby-gyms.controller";
import { Router } from "express";

const fetchNearbyGymsRouter = Router()
const fetchNearbyGymsController = new FetchNearbyGymsController()

fetchNearbyGymsRouter.get("/", fetchNearbyGymsController.fetchNearby)

export { fetchNearbyGymsRouter }