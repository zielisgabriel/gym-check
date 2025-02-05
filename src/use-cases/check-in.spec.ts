import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in-use-case";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe("Check-in services", () => {
    {
        beforeEach(() => {
            inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
            sut = new CheckInService(inMemoryCheckInsRepository)
        })
    
        it('should be able to ckeck in', async () => {
            const { checkIn } = await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
            })

            expect(checkIn.id).toEqual(expect.any(String))
        })
    }
})