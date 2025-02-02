import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/authenticate.service";
import { Request, Response } from "express";
import z from "zod";

export class AuthenticateController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            email: z.string().trim(),
            password: z.string().trim(),
        })

        const { email, password } = bodySchema.parse(req.body)

        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateService = new AuthenticateService(prismaUsersRepository)

        await authenticateService.execute({ email, password })

        res.status(200).json()
    }
}