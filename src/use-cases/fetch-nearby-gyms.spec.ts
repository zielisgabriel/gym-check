import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms-use-case";

describe("Fetch Nearby Gyms Service", () => {
    let inMemoryGymsRepository: InMemoryGymsRepository
    let sut: FetchNearbyGymsService

    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsService(inMemoryGymsRepository)
    })

    it("should be able to show gyms with less to distace 10km", async () => {
        
        await inMemoryGymsRepository.create({
            id: "gym-02",
            title: "Gym Power",
            description: "Academia",
            latitude: -3.7183057,
            longitude: -38.5214507,
            phone: "",
        })
        
        await inMemoryGymsRepository.create({
            id: "gym-02",
            title: "Gym Power",
            description: "Academia",
            latitude: -3.7183057,
            longitude: -38.5214509,
            phone: "",
        })
        
        await inMemoryGymsRepository.create({
            id: "gym-02",
            title: "Gym Power",
            description: "Academia",
            latitude: -3.7183057,
            longitude: -37.5214507,
            phone: "",
        })
        
        const { gyms } = await sut.execute({
            userLatitude: -3.7184104,
            userLongitude: -38.5209261,
        })

        expect(gyms).toHaveLength(2)
    })
})