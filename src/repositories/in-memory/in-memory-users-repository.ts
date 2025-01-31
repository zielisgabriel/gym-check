import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository{
    public database: User[] = []
    
    async findByEmail(email: string): Promise<User | null> {
        const user = this.database.find((item) => item.email === email)   
        
        if(!user){
            return null
        }
        
        return user
    }

    async create(data: Prisma.UserCreateInput) {

        const user = {
            id: 'user_1',
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            createdAt: new Date(),
        }

        this.database.push(user)

        return user
    }

}