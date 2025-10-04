import { Prisma } from "@prisma/client";
import { PrismaClient, IdempotencyKey } from "../generated/prisma";

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
        idemkey: data.key,
      },
    });

    return booking;
  
}

export async function finalizeBooking(
  tx: Prisma.TransactionClient,
  key: string,
  bookingId: number
) {
  const results = await tx.booking.update({
    where: { id: bookingId },
    data: { status: "COMPLETED" },
  });

  return results;
}

export async function createIdempotencyKey(idemkey: string, bookingId: number) {
  const idempotencyKey = await prisma.idempotencyKey.create({
    data: {
      idemkey,
      bookingId,
    },
  });

  return idempotencyKey;
}

// This function should be locked
export async function getIdempotencyKey(
  tx: Prisma.TransactionClient,
  idemkey: string
) {
  const idempotencyKey = await prisma.$queryRaw<IdempotencyKey[]>`
SELECT * FROM "IdempotencyKey" WHERE idemkey = ${idemkey} FOR UPDATE;
`;

  if (idempotencyKey.length == 0) {
    throw new Error("invalid key found ");
  }

  return idempotencyKey[0];
}

export async function finalizeIdentempotencyKey(
  tx: Prisma.TransactionClient,
  idemkey: string
) {
  const idempotencyKey = await tx.idempotencyKey.update({
    where: { idemkey },
    data: { finalized: true },
  });

  return idempotencyKey;
}
