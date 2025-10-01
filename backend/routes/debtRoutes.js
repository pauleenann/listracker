import express from 'express'
import { authenticateUser } from '../middlewares/authenticate.js';
import { addDebt, getDebt } from '../controllers/debtController.js';

const router = express.Router();

router.get(
    '/',
    authenticateUser,
    getDebt
);
router.post(
    '/',
    authenticateUser,
    addDebt
);


export default router