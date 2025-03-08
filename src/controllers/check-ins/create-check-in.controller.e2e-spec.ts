import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

describe("Create Check-In Controller", () => {
    test("[POST] /gyms/:gymId/check-ins", async() => {
        const { token } = await createAndAuthenticateUser()
        const prisma = new PrismaClient()

        const gym = await prisma.gym.create({
            data: {
                title: "Test Name",
                description: "Test description",
                phone: "123456789",
                latitude: 0,
                longitude: 0,
            }
        })

        const response = await request(app)
            .post(`/gyms/${gym?.id}/check-ins`)
            .set("Authorization", `Bearer ${token}`)
            .send({ userLatitude: 0, userLongitude: 0 })

        expect(response.status).toBe(201)
    })
})