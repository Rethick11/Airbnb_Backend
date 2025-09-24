
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

interface Data {
  userId: number;
  hotelId: number;
  bookingAmount: number;
  key: string;
}

export async function createBooking(data: Data) {
  const booking = await prisma.booking.create({
    data: {
      userId: data.userId,
      hotelId: data.hotelId,
      bookingAmount: data.bookingAmount,
      key: data.key,
    },
  });

  return booking;
}

export async function finalizeBooking(key: string, bookingId: number) {
  const results = await prisma.booking.update({
    where: { id: bookingId},
    data: { status: "COMPLETED" },
  });

  return results;

}


export async function createIdempotencyKey(key: string, bookingId: number) {
  const idempotencyKey = await prisma.idempotencyKey.create({
    data: {
      key,
      bookingId,
    },
  });

  return idempotencyKey;
}
// This function should be locked
export async function getIdempotencyKey(key: string) {
  const idempotencyKey = await prisma.idempotencyKey.findUnique({
    where: { key },
  });

  return idempotencyKey;
}

export async function finalizeIdentempotencyKey(key: string) {
  const idempotencyKey = await prisma.idempotencyKey.update({
    where: { key },
    data: { finalized: true },
  });

  return idempotencyKey;
}