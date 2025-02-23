import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../authenticate-use-case"

export function makeAuthenticateUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    return authenticateService
}