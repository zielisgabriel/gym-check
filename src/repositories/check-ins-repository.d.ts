import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    findCheckInOnSameDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    showCheckinsTotalNumber(userId: string): Promise<CheckIn[]>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}