import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileService } from "../get-user-profile-use-case"

export function makeGetUserProfileUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const userCreateServices = new GetUserProfileService(usersRepository)

    return userCreateServices
}