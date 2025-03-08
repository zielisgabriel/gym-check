import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { PrismaClient } from "@prisma/client";
import request from "supertest";

describe("Validate Check-In Controller", () => {
    test("[PATCH] /check-ins/:checkInId/validate", async() => {
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

        await request(app)
            .post(`/gyms/${gym?.id}/check-ins`)
            .set("Authorization", `Bearer ${token}`)
            .send({ userLatitude: 0, userLongitude: 0 })

        let checkIn = await prisma.checkIn.findFirstOrThrow()

        const response = await request(app)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect(response.status).toBe(200)

        checkIn = await prisma.checkIn.findFirstOrThrow({
            where: {
                id: checkIn.id,
            }
        })

        expect(checkIn.validatedAt).toEqual(expect.any(Date))
    })
})