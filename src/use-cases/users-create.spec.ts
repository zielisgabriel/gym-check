import { beforeEach, describe, expect, it } from 'vitest'
import { UserCreateServices } from './users-create-use-case.js'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'
import { hash } from 'bcryptjs'


let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UserCreateServices

describe('Register services', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new UserCreateServices(inMemoryUsersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'Teste',
            email: 'teste@email.com',
            password:'test123',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const user = await inMemoryUsersRepository.create({
            name: 'Teste',
            email: 'test@email.com',
            passwordHash: '123'
        })

        const passwordHashed = await hash(user.passwordHash, 6)
        
        expect(passwordHashed).toEqual(expect.any(String))
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'teste@email.com'

        await sut.execute({
            name: 'Teste',
            email,
            password:'test123',
        })

        await expect(() => sut.execute({
            name: 'Teste',
            email,
            password:'test123',
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
            
    })
})  