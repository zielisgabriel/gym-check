import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import dayjs from "dayjs";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistaceBetweenCoordinates } from "@/utils/get-distace-between-coordinates";


// interface de entrada dos dados
interface CheckInServiceRequest{
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number,
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

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInServiceRequest): Promise<CheckInServiceResponse>{
        const gymFound = await this.gymsRepository.findById(gymId)

        const distanceCalculated = getDistaceBetweenCoordinates(
            {
                latitude: userLatitude,
                longitude: userLongitude,
            },
            {
                latitude: Number(gymFound?.latitude),
                longitude: Number(gymFound?.longitude),
            },
        )

        if(distanceCalculated >= 0.1){
            throw new Error()
        }

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