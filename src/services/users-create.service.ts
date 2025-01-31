import { UsersRepository } from "@/repositories/users-repository";
import { AppError } from "@/utils/AppError";
import { User } from "@prisma/client";
import { hash } from 'bcryptjs'

interface UsersServicesParams{
    name: string,
    email: string,
    password: string,
}

interface UserServicesResponse{
    user: User
}

export class UserCreateServices{
    constructor(private usersRepository: UsersRepository){}

    async execute({ name, email, password, }: UsersServicesParams): Promise<UserServicesResponse>{
        const hashPassword = await hash(password, 6)
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        
        if(userWithSameEmail){
            throw new AppError('Já existe um usuário com esse email e/ou senha', 409)
        }
        
        // const prismaUsersRepository = new PrismaUsersRepository()
        
        const user = await this.usersRepository.create({
            name,
            email,
            passwordHash: hashPassword
        })

        return {
            user,
        }
    }
}