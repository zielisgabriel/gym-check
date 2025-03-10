import { prisma } from "@/database/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository{
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                id,
            }
        })

        return user
    }

    async findByEmail(email: string){
        const user = await prisma.user.findFirst({
            where: {
                email
            },
        })

        return user
    }

    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}