import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository{
    public database: CheckIn[] = []

    async findCheckInOnSameDate(userId: string, date: Date) {
        const checkInFound = this.database.find((checkIn) => {
            const checkInDate = dayjs(checkIn.createdAt.toLocaleDateString()).isSame(date.toLocaleDateString())
            return userId === checkIn.userId && checkInDate
        })

        if(!checkInFound){
            return null
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