import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AuthenticateService } from './authenticate.service.js'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

describe('Authenticate services', () => {
    it('should be able to authenticate', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(inMemoryUsersRepository)

        await inMemoryUsersRepository.create({
            name: 'Teste',
            email: 'test@email.com',
            passwordHash: await hash('test123', 6),
        })

        const { user } = await sut.execute({
            email: 'test@email.com',
            password:'test123',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(inMemoryUsersRepository)

        await inMemoryUsersRepository.create({
            name: 'Teste',
            email: 'test@email.com',
            passwordHash: await hash('test123', 6),
        })

        await expect(
            () => sut.execute({
                email: 'testerror@email.com',
                password: 'test123'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateService(inMemoryUsersRepository)

        await inMemoryUsersRepository.create({
            name: 'Teste',
            email: 'test@email.com',
            passwordHash: await hash('test123', 6),
        })

        await expect(
            () => sut.execute({
                email: 'test@email.com',
                password: 'testerror'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})  