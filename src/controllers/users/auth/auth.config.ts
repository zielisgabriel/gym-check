import { ENV } from '@/env'

interface AuthConfig{
    jwt: {
        secret: string,
        expiresIn: string,
    }
}

export const authConfig: AuthConfig = {
    jwt: {
        secret: ENV.AUTH_SECRET,
        expiresIn: "14d",
    }
}