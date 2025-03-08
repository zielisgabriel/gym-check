import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams{
    latitude: number,
    longitude: number,
}

export interface SearchGymParams{
    query: string,
    page: number,
}

export interface GymsRepository {
    findById(id: string): Promise<Gym>,
    searchGym({ query, page }: SearchGymParams): Promise<Gym[]>,
    findManyNearbyGym(params: FindManyNearbyParams): Promise<Gym[]>,
    create(data: Prisma.GymCreateInput): Promise<Gym>,
}