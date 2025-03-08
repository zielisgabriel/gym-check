import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { Request, Response } from "express";
import { z } from "zod";

const bodySchema = z.object({
    title: z.string().trim(),
    description: z.string().trim().nullable(),
    phone: z.string().trim(),
    latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
        return Math.abs(value) <= 100
    }),
})

export class CreateGymController {
    async create(req: Request, res: Response){
            const { title, description, phone, latitude, longitude } = bodySchema.parse(req.body)
            
            const createGymUseCase = makeCreateGymUseCase()
    
            await createGymUseCase.execute({ title, description, phone, latitude, longitude })
    
            res.status(201).send()
        }
}