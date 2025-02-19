import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository{
    public database: CheckIn[] = []

    async findCheckInOnSameDate({ userId, createdAt }: Prisma.CheckInUncheckedCreateInput) {
        const checkInFound = this.database.find((checkIn) => checkIn.userId === userId)
        
        if(!checkInFound){
            throw new Error()
        }

        return checkInFound
    }

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = {
            id: randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            createdAt: new Date(),
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
        }
        
        this.database.push(checkIn)

        return checkIn
    }
}