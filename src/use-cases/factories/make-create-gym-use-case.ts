import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymServices } from "../create-gym-user-case"

export function makeCreateGymUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const createGymServices = new CreateGymServices(gymsRepository)

    return createGymServices
}