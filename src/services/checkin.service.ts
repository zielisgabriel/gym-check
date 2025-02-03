import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

// interface de entrada dos dados
interface CheckInServiceRequest{
    email: string,
    password: string,
}

// interface de saída dos dados
interface CheckInServiceResponse {
    user: User
}

export class CheckInService{
    constructor(private usersRepository: UsersRepository){}

    async execute({ email, password }: CheckInServiceRequest): Promise<CheckInServiceResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.passwordHash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}