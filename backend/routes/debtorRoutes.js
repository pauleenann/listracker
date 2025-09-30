import express from 'express'
import { authenticateUser } from '../middlewares/authenticate.js';
import { addDebtor, getDebtorSuggestion } from '../controllers/debtorController.js';

const router = express.Router();

router.post(
    '/',
    authenticateUser,
    addDebtor
);
router.get(
    '/',
    authenticateUser,
    getDebtorSuggestion
);

export default router