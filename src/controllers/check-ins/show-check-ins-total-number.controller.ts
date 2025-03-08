import { z } from "zod";
import { Request, Response } from "express"
import { makeShowCheckInsTotalNumberUseCase } from "@/use-cases/factories/make-show-check-ins-total-number-use-case";

const showCheckInsTotalNumberParamsSchema = z.object({
    userId: z.string().uuid(),
})

export class ShowCheckInsTotalNumberController {
    async showTotalNumber(req: Request, res: Response) {
        const { userId } = showCheckInsTotalNumberParamsSchema.parse(req.params)

        const showCheckInsTotalNumber = makeShowCheckInsTotalNumberUseCase()

        const totalCheckIns = await showCheckInsTotalNumber.execute({ userId })

        res.status(200).send({ totalCheckIns })
    }
}