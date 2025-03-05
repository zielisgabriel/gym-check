import request from "supertest"
import { app } from "@/app";
import { createUserParams } from "./tests-utils/create-user-params";

describe("Create User Controller", () => {
    test("[POST] /users", async () => {
        const response = await request(app).post('/users').send(createUserParams)

        expect(response.status).toEqual(201)
    })
})