import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in-use-case";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe("Check-in services", () => {
    {
        beforeEach(() => {
            vi.useFakeTimers()

            inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
            inMemoryGymsRepository = new InMemoryGymsRepository()
            sut = new CheckInService(inMemoryCheckInsRepository, inMemoryGymsRepository)
        })

        afterEach(() => {
            vi.useRealTimers()
        })
    
        it('should be able to ckeck in', async () => {
            vi.setSystemTime(new Date(2025, 1, 0, 7, 0, 0))

            inMemoryGymsRepository.create({
                id: "gym-01",
                title: "Gym Power",
                description: "Academia",
                latitude: 0,
                longitude: 0,
                phone: "",
            })

            const { checkIn } = await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: 0,
                userLontitude: 0,
            })

            expect(checkIn.id).toEqual(expect.any(String))
        })

        it('should not be able to ckeck in twice in the same day', async () => {
            vi.setSystemTime(new Date(2025, 1, 1, 7, 0, 0))

            inMemoryGymsRepository.create({
                id: "gym-01",
                title: "Gym Power",
                description: "Academia",
                latitude: 0,
                longitude: 0,
                phone: "",
            })

            await sut.execute({
                gymId: 'gym-01',
                userId: 'user-02',
                userLatitude: 0,
                userLontitude: 0,
            })

            await expect(() => sut.execute({
                    gymId: 'gym-01',
                    userId: 'user-02',
                    userLatitude: 0,
                    userLontitude: 0,
                })
            ).rejects.toBeInstanceOf(Error)
        })

        it('should be able to ckeck in twice but different day', async () => {
            vi.setSystemTime(new Date(2025, 1, 1, 7, 0, 0))

            inMemoryGymsRepository.create({
                id: "gym-01",
                title: "Gym Power",
                description: "Academia",
                latitude: 0,
                longitude: 0,
                phone: "",
            })

            await sut.execute({
                gymId: 'gym-01',
                userId: 'user-02',
                userLatitude: 0,
                userLontitude: 0,
            })

            vi.setSystemTime(new Date(2025, 1, 2, 7, 0, 0))

            const { checkIn } = await sut.execute({
                gymId: 'gym-01',
                userId: 'user-02',
                userLatitude: 0,
                userLontitude: 0,
            })

            expect(checkIn).toBeTruthy()
        })
    }
})