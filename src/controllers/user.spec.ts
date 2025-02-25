import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";

describe("Create User Controller", () => {
    it("should be able to create user", async () => {
        const response = await request(app).post('/users').send({
            name: "Test",
            email: "test@emai.com",
            passwordHash: "test123",
        })

        expect(response.statusCode).toEqual(201)
    })
})