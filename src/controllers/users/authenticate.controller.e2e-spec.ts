import { app } from "@/app"
import request from "supertest"

describe("Authenticate Controller", () => {
    test("[POST] /me", async() => {
        await request(app).post("/users").send({
            name: "Test Name",
            email: "testemail@email.com",
            password: "test123456",
        })
        
        const response = await request(app).post("/sessions").send({
            email: "testemail@email.com",
            password: "test123456",
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })
    })
})