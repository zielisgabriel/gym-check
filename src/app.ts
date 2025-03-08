import express from 'express'
import 'express-async-errors'
import { routes } from './routes'
import { errorHandling } from './middlewares/error-handling'
import { expressjwt } from "express-jwt"
import { authConfig } from './controllers/users/auth/auth.config'
import cookieParse from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParse())

const { secret } = authConfig.jwt
app.use(expressjwt({
    secret,
    algorithms: ["HS256"],
}).unless({
    path: ["/users", "/sessions", "/token/refresh"]
}))

app.use(routes)

app.use(errorHandling)

export { app }