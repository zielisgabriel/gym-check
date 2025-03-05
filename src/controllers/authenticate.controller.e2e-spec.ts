import { app } from "@/app"
import request from "supertest"

describe("Authenticate Controller", () => {
    it("[POST] /me", async() => {
        await request(app).post("/users").send({
            name: "Test",
            email: "test@email.com",
            password: "test1234",
        })
        
        const response = await request(app).post("/sessions").send({
            email: "test@email.com",
            password: "test1234",
        })

        expect(response.statusCode).toBe(200)
    })
})