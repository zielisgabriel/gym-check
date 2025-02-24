import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface ShowCheckInsTotalNumberRequest{
    userId: string
}

export class ShowCheckInsTotalNumberService{
    constructor(private checkInsRepository: CheckInsRepository){}

    async execute({ userId }: ShowCheckInsTotalNumberRequest): Promise<number>{
        const checkInsCount = await this.checkInsRepository.showCheckinsTotalNumber(userId)

        return checkInsCount
    }
}