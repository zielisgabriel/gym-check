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

        const { secret } = authConfig.jwt
        const token = sign({
            role: user.role,
        }, secret, {
            subject: user.id,
            expiresIn: "10m"
        })

        const refreshToken = sign({
            role: user.role,
        }, secret, {
            subject: user.id,
            expiresIn: "7d"
        })

        res.status(200).cookie("refreshToken", refreshToken, {
            path: "/", // Pode ser acessado em qualquer caminho da aplicação
            secure: true, // HTTPs
            sameSite: true, // O Cookie só vai ser acessível dentro do mesmo domínio
            httpOnly: true, // O Cookie só pode ser acessado pelo back-end
        }).json({ token })
    }
}