import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import z from "zod";
import { hash } from 'bcryptjs'
import { AppError } from "@/utils/AppError";

export class UsersController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim(),
            email: z.string().trim(),
            password: z.string().trim().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)
        
        const hashPassword = await hash(password, 10)

        const userWithSameEmail = await prisma.user.findFirst({
            where: {
                email
            },
        })

        if(userWithSameEmail){
            throw new AppError('Já existe um usuário com esse email e/ou senha', 409)
        }
        

        await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashPassword,
            },
        })

        res.status(201).json()
    }
}