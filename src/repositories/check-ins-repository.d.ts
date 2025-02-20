import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    // findFirst(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findCheckInOnSameDate(userId: string, date: Date): Promise<CheckIn | null>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}