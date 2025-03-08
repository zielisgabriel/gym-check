import { app } from "@/app"
import request from "supertest"

describe("Authenticate Controller", () => {
    test("[PATCH] /token/refresh", async() => {
        await request(app).post("/users").send({
            name: "Test Name",
            email: "test123@email.com",
            password: "test123456"
        })
    
        const authenticate = await request(app).post("/sessions").send({
            email: "test123@email.com",
            password: "test123456"
        })

        const cookies = authenticate.headers["set-cookie"]

        const response = await request(app)
            .patch("/token/refresh")
            .set("Cookie", cookies)
            .send()

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })
        expect(response.body).toHaveProperty("token")
    })
})