import { ENV } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
    log: ENV.NODE_DEV === 'dev' ? ['query'] : []
})