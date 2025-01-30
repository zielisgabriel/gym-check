import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import z from "zod";
import { AppError } from "@/utils/AppError";
import { usersServices } from "@/services/users.service";

export class UsersController{
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