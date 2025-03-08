import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";
import { z } from "zod";
import { Request, Response } from "express"

const fetchNearbyGymsQuerySchema = z.object({
    userLatitude: z.coerce.number().refine((val) => {
        return Math.abs(val) <= 90
    }),
    userLongitude: z.coerce.number().refine((val) => {
        return Math.abs(val) <= 100
    }),
})

export class FetchNearbyGymsController {
    async fetchNearby(req: Request, res: Response) {
        const { userLatitude, userLongitude } = fetchNearbyGymsQuerySchema.parse(req.query)

        const fetchNearbyGyms = makeFetchNearbyGymsUseCase()

        const { gyms } = await fetchNearbyGyms.execute({ userLatitude, userLongitude })

        res.json(gyms)
    }
}