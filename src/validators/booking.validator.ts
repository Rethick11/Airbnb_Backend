import { z } from "zod";

export const bookingSchema = z.object({
    userId: z.number(),
    hotelId: z.number(),
    bookingAmount: z.number().min(1),
    
})