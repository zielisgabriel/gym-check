import { prisma } from "@/database/prisma";
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
            throw new Error('Já existe um usuário com esse email e/ou senha')
        }
        

        await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashPassword,
            },
        })
}