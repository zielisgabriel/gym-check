import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { ResourceNotExistsError } from "@/use-cases/errors/resource-not-exists-error";
import { randomUUID } from "crypto";
import { getDistaceBetweenCoordinates } from "@/utils/get-distace-between-coordinates";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistaceError } from "@/use-cases/errors/max-distance-error";

export class InMemoryGymsRepository implements GymsRepository{
    public database: Gym[] = []

    async findById(id: string): Promise<Gym | null> {
        const gym = this.database.find((item) => item.id === id)

        if(!gym){
            throw new ResourceNotExistsError()
        }

        return gym
    }

    async searchGym(query: string, page: number): Promise<Gym[]> {
        const gymSearched = this.database.filter(
            (item) => item
            .title
            .toLowerCase()
            .includes(
                query
                .toLowerCase()
            )
        )

        return gymSearched.slice((page - 1) * 20, page * 20)
    }

    async findManyNearbyGym(params: FindManyNearbyParams): Promise<Gym[]> {
        return this.database.filter((item) => {
            const distace = getDistaceBetweenCoordinates(
            {
                latitude: params.latitude,
                longitude: params.longitude,
            },
            {
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
            },
        )

        return distace < 10
        })
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