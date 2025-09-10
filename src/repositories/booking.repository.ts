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
  const result = await prisma.$transaction(async (tx) => {
    try {
      await tx.idempotencyKey.create({
        data: {
          bookingId,
          key,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new Error("Duplicate request");
      }
      throw new Error("Failed to create idempotency key");
    }

    const booking = await tx.booking.update({
      where: { id: bookingId },
      data: { status: "COMPLETED" },
      include: { IdempotencyKey: true },
    });

    return booking;
  });

  return result;
}
