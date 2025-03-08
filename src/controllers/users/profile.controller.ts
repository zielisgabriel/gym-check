import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { authConfig } from './auth/auth.config'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

const { verify } = jwt

export class Profile{
    async show(req: Request, res: Response){
        const tokenAuth = req.headers.authorization
        
        if(!tokenAuth){
            throw new Error()
        }

        const [, token] = tokenAuth.split(' ')

        const { secret } = authConfig.jwt
        const { sub: userId } = verify(token, secret) as JwtPayload

        if(!userId){
            throw new Error()
        }

        const getUserProfile = makeGetUserProfileUseCase()
        const { user } = await getUserProfile.execute({
            id: req.auth.sub,
        })

        res.status(200).json({
            user: {
                ...user,
                passwordHash: undefined,
            },
        })
    }
}