import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotExistsError } from "./errors/resource-not-exists-error";

// interface de entrada dos dados
interface GetUserProfileServiceRequest{
    id: string
}

// interface de saída dos dados
interface GetUserProfileServiceResponse {
    user: User
}

export class GetUserProfileService{
    constructor(private usersRepository: UsersRepository){}

    async execute({ id }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse>{
        const user = await this.usersRepository.findById(id)

        if(!user){
            throw new ResourceNotExistsError()
        }

        return {
            user
        }
    }
}