import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymServices } from "../create-gym-user-case"
import { SearchGymsService } from "../search-gyms-use-case"

export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const searchGymsService = new SearchGymsService(gymsRepository)

    return searchGymsService
}