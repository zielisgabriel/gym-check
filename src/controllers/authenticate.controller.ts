import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/use-cases/authenticate-use-case";
import { makeAuthenticateService } from "@/use-cases/factories/make-authenticate-service";
import { Request, Response } from "express";
import z from "zod";

export class AuthenticateController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            email: z.string().trim(),
            password: z.string().trim(),
        })

        const { email, password } = bodySchema.parse(req.body)

        const authenticateService = makeAuthenticateService()

        await authenticateService.execute({ email, password })

        res.status(200).json()
    }
}