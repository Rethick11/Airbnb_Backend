import {
  createBooking,
  createIdempotencyKey,
  finalizeBooking,
  finalizeIdentempotencyKey,
  getIdempotencyKey,
} from "../repositories/booking.repository";
import { generateUUID } from "../utils/helpers/uuid.helpers";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function createBookingService(
  userId: number,
  bookingAmount: number,
  hotelId: number
): Promise<{ id: number; key: string }> {
  const key = generateUUID();
  const booking = await createBooking({
    userId,
    bookingAmount,
    hotelId,
    key,
  });

  await createIdempotencyKey(key, booking.id);

  return {
    id: booking.id,
    key: key,
  };
}

export async function finalizeBookingService(key: string, bookingId: number) {
  return await prisma.$transaction(async (tx) => {
    const idempotencyKey = await getIdempotencyKey(key);

    if (!idempotencyKey) {
      throw new Error("No Key found");
    }

    if (idempotencyKey?.finalized) {
      throw new Error("Duplicate request");
    }

    const booking = await finalizeBooking(key, bookingId);
    await finalizeIdentempotencyKey(key);

    return booking;
  });
}
