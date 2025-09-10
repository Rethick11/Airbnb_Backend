import express from 'express';
import {  validateRequestBody } from '../../validators';
import { bookingSchema } from '../../validators/booking.validator';
import { createBookingHandler, finalizeBookingHandler } from '../../controllers/booking.controller';

const bookingRouter = express.Router();

bookingRouter.post('/createBooking', validateRequestBody(bookingSchema), createBookingHandler); // TODO: Resolve this TS compilation issue

bookingRouter.post('/finalizeBooking', finalizeBookingHandler); // TODO: Resolve this TS compilation issue

bookingRouter.get('/health', (req, res) => {
    res.status(200).send('all OK');
});

export default bookingRouter;