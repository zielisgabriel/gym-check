import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

// interface de entrada dos dados
interface FetchUserCheckInsHistoryServiceRequest{
    userId: string,
    page: number,
}

// interface de saída dos dados
interface FetchUserCheckInsHistoryServiceResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService{
    constructor(
        private checkInsRepository: CheckInsRepository,
    ){}

    async execute({ userId, page }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse>{
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return {
            checkIns
        }
    }
}