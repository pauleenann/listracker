import express from 'express'
import { authenticateUser } from '../middlewares/authenticate.js';
import { addDebtor } from '../controllers/debtorController.js';

const router = express.Router();

router.post(
    '/',
    authenticateUser,
    addDebtor
);


export default router