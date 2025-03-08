import express from 'express'
import 'express-async-errors'
import { routes } from './routes'
import { errorHandling } from './middlewares/error-handling'
import { expressjwt } from "express-jwt"
import { authConfig } from './controllers/users/auth/auth.config'

const app = express()
app.use(express.json())

const { secret } = authConfig.jwt
app.use(expressjwt({
    secret,
    algorithms: ["HS256"]
}).unless({
    path: ["/users", "/sessions"]
}))

app.use(routes)

app.use(errorHandling)

export { app }