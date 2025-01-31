import { UsersRepository } from "@/repositories/users-repository";
import { AppError } from "@/utils/AppError";
import { hash } from 'bcryptjs'

interface UsersServicesParams {
    name: string,
    email: string,
    password: string,
}

export class UserCreateServices{
    constructor(private usersRepository: UsersRepository){}

    async execute({ name, email, password, }: UsersServicesParams){
        const hashPassword = await hash(password, 10)
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        
        if(userWithSameEmail){
            throw new AppError('Já existe um usuário com esse email e/ou senha', 409)
        }
        
        // const prismaUsersRepository = new PrismaUsersRepository()
        
        await this.usersRepository.create({
            name,
            email,
            passwordHash: hashPassword
        })
    }
}