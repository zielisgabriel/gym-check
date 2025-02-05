import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";


// interface de entrada dos dados
interface CheckInServiceRequest{
    userId: string,
    gymId: string,
}

// interface de saída dos dados
interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService{
    constructor(private checkInsRepository: CheckInsRepository){}

    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse>{
        const checkIn = await this.checkInsRepository.create({
            userId,
            gymId,
        })

        return {
            checkIn,
        }
    }
}