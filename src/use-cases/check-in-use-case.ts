import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import dayjs from "dayjs";
import { GymsRepository } from "@/repositories/gyms-repository";


// interface de entrada dos dados
interface CheckInServiceRequest{
    userId: string,
    gymId: string,
    userLatitude: number,
    userLontitude: number,
}

// interface de saída dos dados
interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService{
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ){}

    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse>{
        const gymFound = await this.gymsRepository.findById(gymId)

        // cálculo da latitude e lontitude

        const userWhoCheckIn = await this.checkInsRepository.findCheckInOnSameDate(userId, new Date())

        if(userWhoCheckIn){
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            userId,
            gymId,
        })

        return {
            checkIn,
        }
    }
}