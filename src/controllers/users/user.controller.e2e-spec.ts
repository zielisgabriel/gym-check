import request from "supertest"
import { app } from "@/app";

describe("Create User Controller", () => {
    test("[POST] /users", async () => {
        const response = await request(app).post('/users').send({
            name: "Test Name",
            email: "testemail@email.com",
            password: "test123456",
        })

        expect(response.status).toEqual(201)
    })
})