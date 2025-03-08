import { Request, Response } from "express";
import z from "zod";
import { makeRegisterUseCase } from "@/use-cases/factories/make-user-create-use-case";

export class UsersController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim(),
            email: z.string().trim(),
            password: z.string().trim().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)
        
        const userCreateServices = makeRegisterUseCase()

        await userCreateServices.execute({ name, email, password, })

        res.status(201).json()
    }
}