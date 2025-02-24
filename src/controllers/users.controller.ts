import { Request, Response } from "express";
import z from "zod";
import { UserCreateServices } from "@/use-cases/users-create-use-case";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
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