import express from 'express'
import { authenticateUser } from '../middlewares/authenticate.js';
import { addDebtor, getDebtor, getDebtorDebts, getDebtors, getDebtorSuggestion } from '../controllers/debtorController.js';

const router = express.Router();

router.post(
    '/',
    authenticateUser,
    addDebtor
);
router.get(
    '/',
    authenticateUser,
    getDebtors
);
router.get(
    '/suggestions',
    authenticateUser,
    getDebtorSuggestion
);
router.get(
    '/debts/:id',
    authenticateUser,
    getDebtorDebts
);
router.get(
    '/:id',
    authenticateUser,
    getDebtor
);


export default router