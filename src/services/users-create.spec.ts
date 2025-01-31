import { describe, expect, it } from 'vitest'
import { UserCreateServices } from './users-create.service.js'
import { compare } from 'bcryptjs'

describe('Register services', () => {
    it('should hash user password upon registration', async () => {
        const userCreateServices = new UserCreateServices({
            async findByEmail(email){
                return null
            },
            
            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    passwordHash: data.passwordHash,
                    createdAt: new Date()
                }
            },
        })

        const { user } = await userCreateServices.execute({
            name: 'Teste',
            email: 'teste@email.com',
            password:'test123',
        })

        const isPasswordHashed = await compare('test123', user.passwordHash)

        expect(isPasswordHashed).toBe(true)
    })
})