import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym Controller", () => {
    test("[POST] /gyms", async() => {
        const { token } = await createAndAuthenticateUser()

        const response = await request(app).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "Test Name",
            description: "Test description",
            phone: "123456789",
            latitude: 0,
            longitude: 0,
        })

        expect(response.status).toBe(201)
    })
})