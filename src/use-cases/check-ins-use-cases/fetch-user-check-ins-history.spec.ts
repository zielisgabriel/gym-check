import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, it } from "vitest";
import { expect } from "vitest";
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history-use-case";

describe("Fetch User Check Ins History Use Case", () => {
    let inMemoryCheckInsRepository: InMemoryCheckInsRepository
    let sut: FetchUserCheckInsHistoryService

    beforeEach(() => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryService(inMemoryCheckInsRepository)
    })

    it("should be able to fetch check ins", async () => {
        await inMemoryCheckInsRepository.create({
            userId: "user-01",
            gymId: "gym-01",
        })

        await inMemoryCheckInsRepository.create({
            userId: "user-01",
            gymId: "gym-02",
        })

        const { checkIns } = await sut.execute({
            userId: "user-01",
            page: 1,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gymId: "gym-01" }),
            expect.objectContaining({ gymId: "gym-02" }),
        ])
    })

    it("should be able to fetch paginated check-ins history", async () => {
        for(let i = 0; i <= 25; i++){
            await inMemoryCheckInsRepository.create({
                userId: "user-01",
                gymId: `gym-${i}`,
            })
        }

        const { checkIns } = await sut.execute({ userId: "user-01", page: 1 })

        expect(checkIns).toHaveLength(20)
    })
})