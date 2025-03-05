import { app } from "@/app"
import request from "supertest"
import { createUserParams } from "./tests-utils/create-user-params"
import { authenticateUserParams } from "./tests-utils/authenticate-user-params"

describe("Authenticate Controller", () => {
    test("[POST] /me", async() => {
        await request(app).post("/users").send(createUserParams)
        
        const response = await request(app).post("/sessions").send(authenticateUserParams)

        expect(response.statusCode).toBe(200)
    })
})