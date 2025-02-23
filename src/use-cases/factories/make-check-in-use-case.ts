import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInService } from "../check-in-use-case"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCheckInUseCase(){
    const checkInRepository = new PrismaCheckInsRepository
    const gymRepository = new PrismaGymsRepository()
    const checkInService = new CheckInService(checkInRepository, gymRepository)

    return checkInService
}