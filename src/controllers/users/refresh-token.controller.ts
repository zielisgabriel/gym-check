import { Request, Response } from "express";
import { authConfig } from "./auth/auth.config";
import jwt from "jsonwebtoken";

const {sign} = jwt

export class RefreshTokenController{
    async refresh(req: Request, res: Response){
        const { secret } = authConfig.jwt
        const getRefreshToken = req.cookies.refreshToken

        if(!getRefreshToken){
            res.status(401).json({ error: "Invalid or expired refresh token." })
            return
        }

        let decodedToken: any
        try {
            decodedToken = jwt.verify(getRefreshToken, secret)
        } catch (error) {
            res.status(401).json({ error: "Invalid or expired refresh token." })
            return
        }

        if(!decodedToken.sub){
            res.status(401).json({ error: "Invalid token payload." })
            return
        }

        const token = sign({
            role: decodedToken.role,
        }, secret, {
            subject: decodedToken.sub,
            expiresIn: "10m"
        })

        const refreshToken = sign({
            role: decodedToken.role,
        }, secret, {
            subject: decodedToken.sub,
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