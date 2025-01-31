import { Request, Response } from "express";
import z, { string } from "zod";
import { AppError } from "@/utils/AppError";
import { usersServices } from "@/services/users-create.service";
import { prisma } from "@/database/prisma";

export class UsersController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim(),
            email: z.string().trim(),
            password: z.string().trim().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)
        
        await usersServices({ name, email, password, })

        res.status(201).json()
    }
}