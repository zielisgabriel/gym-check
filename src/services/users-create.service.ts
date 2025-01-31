import { prisma } from "@/database/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { AppError } from "@/utils/AppError";
import { hash } from 'bcryptjs'

interface UsersServicesParams {
    name: string,
    email: string,
    password: string,
}

export async function usersServices({ name, email, password, }: UsersServicesParams){
    const hashPassword = await hash(password, 10)

        const userWithSameEmail = await prisma.user.findFirst({
            where: {
                email
            },
        })

        if(userWithSameEmail){
            throw new AppError('Já existe um usuário com esse email e/ou senha', 409)
        }
        
        const prismaUsersRepository = new PrismaUsersRepository()

        await prismaUsersRepository.create({
            name,
            email,
            passwordHash: hashPassword
        })
}