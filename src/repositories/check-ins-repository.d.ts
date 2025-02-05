import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository{
    // findFirst(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}