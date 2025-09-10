import {Prisma,  PrismaClient,  } from '../generated/prisma';

const prisma = new PrismaClient();

export class BookingRepository {
  async createBooking(data: Prisma.BookingCreateInput) {
    return prisma.booking.create({ data });
  }
}

