import { ResourceNotExistsError } from "@/use-cases/errors/resource-not-exists-error";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/database/prisma";
import { Gym, Prisma } from "@prisma/client";

export class PrismaGymsRepository implements GymsRepository{
    async findById(id: string) {
        const gym = await prisma.gym.findFirst({
            where: {
                id,
            }
        })

        if(!gym){
            throw new ResourceNotExistsError()
        }

        return gym
    }

    async searchGym(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                }
            }
        })

        return gyms
    }

    async findManyNearbyGym({ latitude, longitude }: FindManyNearbyParams) {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }
}