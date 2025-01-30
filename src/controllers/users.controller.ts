import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import z from "zod";
import { hash } from 'bcrypt'

export class usersController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim(),
            email: z.string().trim(),
            password: z.string().trim().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)
        
        const hashPassword = await hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashPassword,
            }
        })

        res.status(201).json()
    }
}