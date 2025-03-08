import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Fetch Gym Controller", () => {
    test("[GET] /gyms/nearby", async() => {
        const { token } = await createAndAuthenticateUser()

        await request(app).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "Test Name",
            description: "Test description",
            phone: "123456789",
            latitude: 0,
            longitude: 0,
        })

        await request(app).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "Test Name",
            description: "Test description",
            phone: "123456789",
            latitude: 5,
            longitude: 5,
        })

        const response = await request(app)
            .get("/gyms/nearby")
            .set("Authorization", `Bearer ${token}`)
            .query({
                userLatitude: 0,
                userLongitude: 0,
            })
            .send()

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})