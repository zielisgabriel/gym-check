import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gym Controller", () => {
    test("[GET] /gyms/search?query?page", async() => {
        const { token } = await createAndAuthenticateUser()

        await request(app).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "Test",
            description: "Test description",
            phone: "123456789",
            latitude: 0,
            longitude: 0,
        })

        const response = await request(app)
            .get("/gyms/search")
            .set("Authorization", `Bearer ${token}`)
            .query({
                query: "Test",
            })
            .send()

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
        expect(response.body).toEqual([
            expect.objectContaining({
                title: "Test",
            })
        ])
    })
})