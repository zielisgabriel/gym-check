import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsService } from "./search-gyms-use-case";

describe("Search Gyms Service", () => {
    let inMemoryGymsRepository: InMemoryGymsRepository
    let sut: SearchGymsService
    
    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsService(inMemoryGymsRepository)
    })

    it("should be able to return result of gyms searched", async () => {
        await inMemoryGymsRepository.create({
            id: "gym-02",
            title: "Gym Power",
            description: "Academia",
            latitude: -3.7599854,
            longitude: -38.6484074,
            phone: "",
        })
        
        const { gyms } = await sut.execute({
            query: "Power",
            page: 1,
        })

        expect(gyms).toHaveLength(1)
    })

    it("should be able to return result of gyms searched using lower cases", async () => {
        await inMemoryGymsRepository.create({
            id: "gym-02",
            title: "Gym Power",
            description: "Academia",
            latitude: -3.7599854,
            longitude: -38.6484074,
            phone: "",
        })

        await inMemoryGymsRepository.create({
            id: "gym-02",
            title: "Power Gym",
            description: "Academia",
            latitude: -3.7599854,
            longitude: -38.6484074,
            phone: "",
        })
        
        const { gyms } = await sut.execute({
            query: "power",
            page: 1,
        })

        expect(gyms).toHaveLength(2)
    })
})