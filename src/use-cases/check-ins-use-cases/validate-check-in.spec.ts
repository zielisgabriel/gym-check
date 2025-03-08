import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "./validate-check-in-use-case";

describe("Check-in services", () => {
    let inMemoryCheckInsRepository: InMemoryCheckInsRepository
    let sut: ValidateCheckInService

    {
        beforeEach(() => {
            vi.useFakeTimers()

            inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
            sut = new ValidateCheckInService(inMemoryCheckInsRepository)
        })

        afterEach(() => {
            vi.useRealTimers()
        })
    
        it('should be able to validate check-ins to before 20 minutes', async () => {
            vi.setSystemTime(new Date(2025, 0, 1, 7, 0, 0))

            const checkInCreated = await inMemoryCheckInsRepository.create({
                userId: "user-1",
                gymId: "gym-01"
            })

            
            vi.setSystemTime(new Date(2025, 0, 1, 7, 10, 0))

            const { checkIn } = await sut.execute({
                checkInId: checkInCreated.id
            })

            let isDateChange

            if(checkIn.createdAt !== checkIn.validatedAt){
                isDateChange = true
            } else{
                isDateChange = false
            }

            expect(isDateChange).toBeTruthy()
        })
    
        it('should not be able to validate check-ins to after 20 minutes', async () => {
            vi.setSystemTime(new Date(2025, 0, 1, 7, 0, 0))

            const checkInCreated = await inMemoryCheckInsRepository.create({
                userId: "user-1",
                gymId: "gym-01"
            })

            
            vi.setSystemTime(new Date(2025, 0, 1, 7, 30, 0))

            await expect(() => sut.execute({
                checkInId: checkInCreated.id
            })).rejects.toBeInstanceOf(Error)
        })
    }
})