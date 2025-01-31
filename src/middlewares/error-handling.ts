import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/AppError'
import { ZodError } from 'zod'
import { ENV } from '@/env'

export function errorHandling(error: any, req: Request, res: Response, _: NextFunction){
    if(error instanceof AppError){
        res.status(error.statusCode).json({ message: error.message })
        return
    }

    if(error instanceof ZodError){
        res.status(400).json({ message: "Erro de validação", issues: error.format() })
        return
    }

    if(ENV.NODE_DEV !== 'dev'){
        console.log(error)
    }

    res.status(500).json({ message: "Erro interno" })
    return
}