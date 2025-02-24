import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { ENV } from '@/env'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export function errorHandling(error: any, req: Request, res: Response, _: NextFunction){
    if(error instanceof Error){
        res.status(500).json({ message: error.message })
    }

    if(error instanceof ZodError){
        res.status(400).json({ message: "Erro de validação", issues: error.format() })
        return
    }

    if(error instanceof UserAlreadyExistsError){
        res.status(409).json({ message: error.message })
        return
    }

    if(error instanceof InvalidCredentialsError){
        res.status(400).json({ message: error.message })
        return
    }

    if(ENV.NODE_DEV === 'dev'){
        return console.log(error)
    }

    res.status(500).json({ message: "Erro interno" })
    return
}