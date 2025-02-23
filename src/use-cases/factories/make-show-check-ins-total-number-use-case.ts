import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ShowCheckInsTotalNumberService } from "../show-check-ins-total-number-use-case"

export function makeShowCheckInsTotalNumberUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository
    const showCheckInsTotalNumberService = new ShowCheckInsTotalNumberService(checkInsRepository)

    return showCheckInsTotalNumberService
}