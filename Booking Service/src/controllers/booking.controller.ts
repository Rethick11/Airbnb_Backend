import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";
import { createBookingService, finalizeBookingService } from "../service/booking.service";


export const createBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Create booking request received");
    const { userId, hotelId, bookingAmount } = req.body;

    try {
        const booking = await createBookingService(userId, hotelId, bookingAmount);
        res.status(201).json(booking);
    } catch (error) {
        logger.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to create booking" });
    }
}


export const finalizeBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Finalize booking request received");
    try {

        const booking = await finalizeBookingService(req.body.key, parseInt(req.body.id));
        res.status(200).json(booking);
    } catch (error : any ) {
        logger.error("Error finalizing booking:", error);
        res.status(500).json({error: error.message});
    }
}
