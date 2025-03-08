import { z } from "zod";
import { Request, Response } from "express"
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
})

export class ValidateCheckInController {
    async validate(req: Request, res: Response) {
        const { checkInId } = validateCheckInParamsSchema.parse(req.params)

        const validateCheckIn = makeValidateCheckInUseCase()

        const { checkIn } = await validateCheckIn.execute({ checkInId })

        res.status(200).send({ checkIn })
    }
}