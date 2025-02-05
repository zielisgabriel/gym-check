import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileService } from "./get-user-profile-use-case";
import { hash } from "bcryptjs";
import { ResourceNotExistsError } from "./errors/resource-not-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe("Get user profile services", () => {
    {

        beforeEach(() => {
            inMemoryUsersRepository = new InMemoryUsersRepository()
            sut = new GetUserProfileService(inMemoryUsersRepository)
        })
    
        it('should be able to get user profile by id', async () => {
            const userCreate = await inMemoryUsersRepository.create({
                name: 'Teste',
                email: 'test@email.com',
                passwordHash: await hash('test123', 6)
            })
            
            const { user } = await sut.execute({
                id: userCreate.id
            })

            expect(user.name).toEqual("Teste")
            expect(user.email).toEqual("test@email.com")
            expect(user.passwordHash).toEqual(expect.any(String))
        })

        it('should be able to throw an error if the user accesses a non-existent id', async() => {
            await expect(
                () => sut.execute({
                    id: 'non-existent-id',
                })
            ).rejects.toBeInstanceOf(ResourceNotExistsError)
        })
    }
})