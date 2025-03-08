import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

describe("History Check-In Controller", () => {
    test("[GET] /check-ins/:userId/history", async() => {
        const { token } = await createAndAuthenticateUser()
        const prisma = new PrismaClient()

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: "Test Name",
                description: "Test description",
                phone: "123456789",
                latitude: 0,
                longitude: 0,
            }
        })

        await request(app)
            .post(`/gyms/${gym?.id}/check-ins`)
            .set("Authorization", `Bearer ${token}`)
            .send({ userLatitude: 0, userLongitude: 0 })

        const response = await request(app)
            .get(`/check-ins/${user.id}/history?page=1`)
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
    })
})