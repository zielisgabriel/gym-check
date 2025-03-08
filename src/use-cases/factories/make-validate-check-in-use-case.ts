import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInService } from "../check-ins-use-cases/validate-check-in-use-case"

export function makeValidateCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository
    const validateCheckInService = new ValidateCheckInService(checkInsRepository)

    return validateCheckInService
}