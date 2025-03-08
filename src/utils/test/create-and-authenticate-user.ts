import { app } from "@/app";
import { prisma } from "@/database/prisma";
import request from "supertest";



export async function createAndAuthenticateUser() {
    await request(app).post("/users").send({
        name: "Test Name",
        email: "test123@email.com",
        password: "test123456"
    })

    await prisma.user.update({
        where: {
            email: "test123@email.com"
        },
        data: {
            role: "ADMIN"
        }
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