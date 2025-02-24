import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/database/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository{
    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                userId,
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return checkIns
    }

    async showCheckinsTotalNumber(userId: string): Promise<number> {
        const checkInsCount = await prisma.checkIn.count({
            where: {
                userId,
            }
        })

        return checkInsCount
    }

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.create({
            data,
        })

        return checkIn
    }

    async findById(checkInId: string): Promise<CheckIn | null> {
        const findCheckin = await prisma.checkIn.findFirst({
            where: {
                id: checkInId,
            }
        })

        if(!findCheckin){
            return null
        }

        return findCheckin
    }

    async findCheckInOnSameDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDate = dayjs(date).startOf('date')
        const endOfTheDate = dayjs(date).endOf('date')
        
        const findCheckinOnSameDate = await prisma.checkIn.findFirst({
            where: {
                userId,
                createdAt: {
                    gte: startOfTheDate.toDate(),
                    lte: endOfTheDate.toDate(),
                }
            }
        })

        return findCheckinOnSameDate
    }
}