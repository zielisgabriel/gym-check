import { z } from "zod";
import { Request, Response } from "express";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
})

const historyCheckInsParamsSchema = z.object({
    userId: z.string().uuid(),
})

export class HistoryCheckInsController {
    async history(req: Request, res: Response) {
        const { userId } = historyCheckInsParamsSchema.parse(req.params)
        const { page } = historyCheckInsQuerySchema.parse(req.query)
        console.log(req.query)
    

        const historyCheckIns = makeFetchUserCheckInsHistoryUseCase()

        const { checkIns } = await historyCheckIns.execute({
            page,
            userId,
        })

        res.status(200).send(checkIns)
    }
}