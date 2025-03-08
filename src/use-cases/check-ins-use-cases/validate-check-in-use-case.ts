import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import dayjs from "dayjs";
import { ResourceNotExistsError } from "../errors/resource-not-exists-error";


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

        const checkInValidated = await this.checkInsRepository.validate(checkInId)

        return {
            checkIn: checkInValidated
        }
    }
}