import express from 'express';


const hotelRouter = express.Router();


hotelRouter.get('/health', (req, res) => {
    res.status(200).send('all OK');
});

export default hotelRouter;  