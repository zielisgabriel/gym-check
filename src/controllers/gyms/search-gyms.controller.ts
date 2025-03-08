import { z } from "zod";
import { Request, Response } from "express"
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
})

export class SearchGymsController {
    async searchGyms(req: Request, res: Response) {
        const { query, page } = searchGymsQuerySchema.parse(req.query)

        const searchGym = makeSearchGymsUseCase()

        const { gyms } = await searchGym.execute({ query, page })

        res.json(gyms)
    }
}