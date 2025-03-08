import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { Request, Response } from "express";
import z from "zod";
import { authConfig } from "./auth/auth.config";
import jwt from "jsonwebtoken";

const {sign} = jwt

export class AuthenticateController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            email: z.string().trim(),
            password: z.string().trim(),
        })

        const { email, password } = bodySchema.parse(req.body)

        const authenticateService = makeAuthenticateUseCase()

        const { user } = await authenticateService.execute({ email, password })

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: user.id
        } as {
            subject: string
        })

        res.status(200).json({ token })
    }
}