import { z } from "zod";
import { Request, Response } from "express"
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
})

const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
        return Math.abs(value) <= 100
    }),
})

export class CreateCheckInController {
    async create(req: Request, res: Response) {
        const { gymId } = createCheckInParamsSchema.parse(req.params)

        const { userLatitude, userLongitude } = createCheckInBodySchema.parse(req.body)

        const createCheckIns = makeCheckInUseCase()


        await createCheckIns.execute({ gymId, userId: req.auth.sub, userLatitude, userLongitude })

        res.status(201).send()
    }
}