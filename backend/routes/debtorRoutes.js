import express from 'express'
import { authenticateUser } from '../middlewares/authenticate';
import { addDebtor } from '../controllers/debtorController';

const router = express.Router();

router.post(
    '/',
    authenticateUser,
    addDebtor
);


export default router