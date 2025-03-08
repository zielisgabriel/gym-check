import { app } from "@/app";
import request from "supertest";

export async function createAndAuthenticateUser() {
    await request(app).post("/users").send({
        name: "Test Name",
        email: "test123@email.com",
        password: "test123456"
    })

    const authenticateResponse = await request(app).post("/sessions").send({
        email: "test123@email.com",
        password: "test123456"
    })
    
    const token = authenticateResponse.body["token"]

    return {
        token,
    }
}