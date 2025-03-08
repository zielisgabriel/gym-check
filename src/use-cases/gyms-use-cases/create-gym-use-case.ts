import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface GymServicesParams{
    title: string,
    description?: string | null,
    phone: string,
    latitude: number,
    longitude: number,
}

interface GymServicesResponse{
    gym: Gym
}

export class CreateGymServices{
    constructor(private gymRepository: GymsRepository){}

    async execute({ title, description, phone, latitude, longitude }: GymServicesParams): Promise<GymServicesResponse>{
        const gym = await this.gymRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
        })

        return {
            gym
        }
    }
}