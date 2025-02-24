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

    async findById(checkInId: string): Promise<CheckIn | null> {
        const checkIn = this.database.find((item) => item.id === checkInId)

        if(!checkIn){
            return null
        }

        return checkIn
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkIns = this.database.filter((item) => item.userId === userId)

        return checkIns.slice((page - 1) * 20, page * 20)
    }

    async showCheckinsTotalNumber(userId: string){
        const checkIns = this.database.filter((item) => item.userId === userId)
        
        return checkIns.length
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