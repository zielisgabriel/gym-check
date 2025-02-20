import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

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
            throw new UserAlreadyExistsError()
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