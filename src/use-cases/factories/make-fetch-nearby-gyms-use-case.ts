import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymsService } from "../gyms-use-cases/fetch-nearby-gyms-use-case"

export function makeFetchNearbyGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository
    const fetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository)

    return fetchNearbyGymsService
}