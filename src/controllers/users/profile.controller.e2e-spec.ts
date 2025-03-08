import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";

describe("Profile Controller", () => {
    test("[POST] /me", async () => {
        const { token } = await createAndAuthenticateUser()

        const profile = await request(app)
            .get("/me")
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect(profile.status).toBe(200)
    })
})