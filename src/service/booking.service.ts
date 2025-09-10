
import { createBooking, finalizeBooking } from "../repositories/booking.repository"
import { generateUUID } from "../utils/helpers/uuid.helpers"

export  async function  createBookingService( userId : number, bookingAmount : number, hotelId : number) : Promise<{id : number, key : string}>{
        const key = generateUUID()
        const booking = await createBooking({
                userId,
                bookingAmount,
                hotelId,
                key
        })
        
        return {
                id : booking.id,
                key : booking.key
        }
}

export async function finalizeBookingService(key: string, bookingId: number) {

        const booking = await finalizeBooking(key,bookingId)

        return booking
}