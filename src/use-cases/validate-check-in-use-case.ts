import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotExistsError } from "./errors/resource-not-exists-error";
import dayjs from "dayjs";


// interface de entrada dos dados
interface ValidateCheckInRequest{
    checkInId: string
}

// interface de saída dos dados
interface ValidateCheckInResponse {
    checkIn: CheckIn
}

export class ValidateCheckInService{
    constructor(
        private checkInsRepository: CheckInsRepository,
    ){}

    async execute({ checkInId }: ValidateCheckInRequest): Promise<ValidateCheckInResponse>{
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if(!checkIn){
            throw new ResourceNotExistsError()
        }

        const maximumValidationTime = dayjs(checkIn.createdAt).add(20, 'minute')

        if(maximumValidationTime.isBefore(new Date())){
            throw new Error()
        }

        checkIn.validatedAt = new Date()

        return {
            checkIn
        }
    }
}