import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInService } from "../check-ins-use-cases/check-in-use-case"

export function makeCheckInUseCase(){
    const checkInRepository = new PrismaCheckInsRepository
    const gymRepository = new PrismaGymsRepository()
    const checkInService = new CheckInService(checkInRepository, gymRepository)

    return checkInService
}