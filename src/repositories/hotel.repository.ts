import { Prisma, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

class HotelRepository {

    async createHotel(data : Prisma.HotelCreateInput) {
        return await prisma.hotel.create({ data });
    }

}

export default new HotelRepository();