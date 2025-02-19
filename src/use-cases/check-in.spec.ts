import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in-use-case";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe("Check-in services", () => {
    {
        beforeEach(() => {
            inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
            sut = new CheckInService(inMemoryCheckInsRepository)
            
            vi.useFakeTimers()
        })

        afterEach(() => {
            vi.useRealTimers()
        })
    
        it('should be able to ckeck in', async () => {
            vi.setSystemTime(new Date(2025, 1, 0, 7, 0, 0))

            const { checkIn } = await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
            })

            console.log(checkIn.createdAt)

            expect(checkIn.id).toEqual(expect.any(String))
        })

        it('should not be able to ckeck in twice in the same day', async () => {

            await sut.execute({
                gymId: 'gym-02',
                userId: 'user-02',
            })

            await expect(() => sut.execute({
                    gymId: 'gym-02',
                    userId: 'user-02',
                })
            ).rejects.toBeInstanceOf(Error)
        })
    }
})