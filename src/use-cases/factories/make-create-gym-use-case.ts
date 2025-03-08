import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymServices } from "../gyms-use-cases/create-gym-use-case"

export function makeCreateGymUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const createGymServices = new CreateGymServices(gymsRepository)

    return createGymServices
}