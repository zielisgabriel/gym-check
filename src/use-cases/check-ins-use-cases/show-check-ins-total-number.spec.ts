import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ShowCheckInsTotalNumberService } from "./show-check-ins-total-number-use-case";

describe("Show Check Ins Number Total Use Case", () => {
    let inMemoryCheckInsRepository: InMemoryCheckInsRepository
    let sut: ShowCheckInsTotalNumberService
    
    beforeEach(() => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        sut = new ShowCheckInsTotalNumberService(inMemoryCheckInsRepository)
    })
    
    
    it("should be able to return checkins number total", async () => {
        for(let i = 0; i <= 25; i++){
            await inMemoryCheckInsRepository.create({
                userId: "user-01",
                gymId: `gym-${i}`,
            })
        }
        
        const checkInsTotal = await sut.execute({
            userId: "user-01"
        })

        expect(checkInsTotal).toBe(26)
    })
})