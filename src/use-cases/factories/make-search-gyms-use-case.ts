import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymsService } from "../gyms-use-cases/search-gyms-use-case"

export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const searchGymsService = new SearchGymsService(gymsRepository)

    return searchGymsService
}