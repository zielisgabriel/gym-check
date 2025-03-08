import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymServices } from "./create-gym-use-case";

describe('Create gym service', () => {
    let inMemoryGymsRepository: InMemoryGymsRepository
    let createGymUseCase: CreateGymServices

    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        createGymUseCase = new CreateGymServices(inMemoryGymsRepository)
    })

    it('should be able to create gym', async () => {
        const { gym } = await createGymUseCase.execute({
            title: 'Test Gym',
            description: 'Test description',
            phone: "12 123456789",
            latitude: 0,
            longitude: 0,
        })

        expect(gym).toEqual({
            id: gym.id,
            title: 'Test Gym',
            description: 'Test description',
            phone: "12 123456789",
            latitude: 0,
            longitude: 0,
        })
    })
})