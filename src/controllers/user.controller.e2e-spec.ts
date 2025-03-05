import request from "supertest"
import { app } from "@/app";

describe("Create User Controller", () => {
    it("[POST] /users", async () => {
        const response = await request(app).post('/users').send({
            name: "Test",
            email: "test@email.com",
            password: "test123",
        })

        expect(response.status).toEqual(201)
    })
})