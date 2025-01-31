import { Request, Response } from "express";
import z from "zod";
import { AppError } from "@/utils/AppError";
import { usersServices } from "@/services/users-create.service";
import { prisma } from "@/database/prisma";

export class UsersController{
    async index(req: Request, res: Response){
        const users = await prisma.user.findMany()
        
        res.json(users)
    }

    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim(),
            email: z.string().trim(),
            password: z.string().trim().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)
        
        try {
            usersServices({ name, email, password, })
        } catch (err) {
            throw new AppError(err as string, 409)
        }

        res.status(201).json()
    }
}