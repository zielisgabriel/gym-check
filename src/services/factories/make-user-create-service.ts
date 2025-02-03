import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserCreateServices } from "../users-create.service"

export function makeRegisterService(){
    const usersRepository = new PrismaUsersRepository()
    const userCreateServices = new UserCreateServices(usersRepository)

    return userCreateServices
}