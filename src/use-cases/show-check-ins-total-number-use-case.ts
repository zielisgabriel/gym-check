import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface ShowCheckInsTotalNumberRequest{
    userId: string
}

export class ShowCheckInsTotalNumberService{
    constructor(private checkInsRepository: CheckInsRepository){}

    async execute({ userId }: ShowCheckInsTotalNumberRequest): Promise<number>{
        const checkIns = await this.checkInsRepository.showCheckinsTotalNumber(userId)

        return checkIns.length
    }
}