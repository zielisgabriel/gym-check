import { app } from "@/app";
import request from "supertest";
import { createUserParams } from "./tests-utils/create-user-params";
import { authenticateUserParams } from "./tests-utils/authenticate-user-params";

describe("Profile Controller", () => {
    test("[POST] /me", async () => {
        await request(app).post("/users").send(createUserParams)
        const authenticateResponse = await request(app).post("/sessions").send(authenticateUserParams)
        
        const token = authenticateResponse.body["token"]

        const profile = await request(app)
            .get("/me")
            .set("Authorization", `Bearer ${token}`)
            .send(authenticateUserParams)

        expect(profile.status).toBe(200)
        expect(profile.body.user.id).toEqual(expect.any(String))
    })
})