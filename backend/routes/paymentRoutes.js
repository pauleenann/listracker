import express from 'express';

import { createPayment } from '../controllers/paymentController.js';
import { authenticateUser } from '../middlewares/authenticate.js';

const router = express.Router();

router.post(
    '/',
    authenticateUser,   
    createPayment
);

export default router;