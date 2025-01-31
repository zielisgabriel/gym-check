import { describe, expect, it } from 'vitest'
import { UserCreateServices } from './users-create.service.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'

describe('Register services', () => {
    it('should hash user password upon registration', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const userCreateServices = new UserCreateServices(inMemoryUsersRepository)

        const { user } = await userCreateServices.execute({
            name: 'Teste',
            email: 'teste@email.com',
            password:'test123',
        })

        const isPasswordHashed = await compare('test123', user.passwordHash)

        expect(isPasswordHashed).toBe(true)
    })
})