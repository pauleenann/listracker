import express from 'express'
import { authenticateUser } from '../middlewares/authenticate.js';
import { addDebt } from '../controllers/debtController.js';

const router = express.Router();

router.post(
    '/',
    authenticateUser,
    addDebt
);


export default router