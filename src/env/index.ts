import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    HOST: z.coerce.string().default('0.0.0.0'),
    NODE_DEV: z.enum(['dev', 'test', 'production']).default('dev'),
    AUTH_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables.')
}

export const ENV = _env.data