import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { ResourceNotExistsError } from "@/use-cases/errors/resource-not-exists-error";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymsRepository implements GymsRepository{
    public database: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.database.find((item) => item.id === id)

        if(!gym){
            throw new ResourceNotExistsError()
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id: data.id || randomUUID(),
            title: data.title,
            description: data.description || null,
            phone: data.phone || null,
            latitude: data.latitude as Decimal,
            longitude: data.longitude as Decimal,
        }
        
        this.database.push(gym)

        return gym
    }
}