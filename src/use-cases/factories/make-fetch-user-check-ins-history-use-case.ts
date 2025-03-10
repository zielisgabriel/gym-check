import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistoryService } from "../check-ins-use-cases/fetch-user-check-ins-history-use-case"

export function makeFetchUserCheckInsHistoryUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository
    const fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(checkInsRepository)

    return fetchUserCheckInsHistoryService
}