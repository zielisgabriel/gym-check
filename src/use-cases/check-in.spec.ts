import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in-use-case";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

describe("Check-in services", () => {
    let inMemoryCheckInsRepository: InMemoryCheckInsRepository
    let inMemoryGymsRepository: InMemoryGymsRepository
    let sut: CheckInService

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
                userLongitude: 0,
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
                userLongitude: 0,
            })

            await expect(() => sut.execute({
                    gymId: 'gym-01',
                    userId: 'user-02',
                    userLatitude: 0,
                    userLongitude: 0,
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
                userLongitude: 0,
            })

            vi.setSystemTime(new Date(2025, 1, 2, 7, 0, 0))

            const { checkIn } = await sut.execute({
                gymId: 'gym-01',
                userId: 'user-02',
                userLatitude: 0,
                userLongitude: 0,
            })

            expect(checkIn).toBeTruthy()
        })

        it('should not be able to check in distant gym', async () => {
            await inMemoryGymsRepository.create({
                id: "gym-02",
                title: "Gym Power",
                description: "Academia",
                latitude: -3.7599854,
                longitude: -38.6484074,
                phone: "",
            })

            await expect(() => sut.execute({
                gymId: 'gym-02',
                userId: 'user-02',
                userLatitude: -3.7220349,
                userLongitude: -38.5086167,
            })).rejects.toBeInstanceOf(Error)
        })

        it('should be able to check in to the gym from at least 100 meters away', async () => {
            await inMemoryGymsRepository.create({
                id: "gym-02",
                title: "Gym Power",
                description: "Academia",
                latitude: -3.7183057,
                longitude: -38.5214507,
                phone: "",
            })

            const { checkIn } = await sut.execute({
                gymId: 'gym-02',
                userId: 'user-02',
                userLatitude: -3.7184104,
                userLongitude: -38.5209261,
            })

            expect(checkIn.id).toEqual(expect.any(String))
        })
    }
})