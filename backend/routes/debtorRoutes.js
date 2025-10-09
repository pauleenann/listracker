import express from 'express'
import { authenticateUser } from '../middlewares/authenticate.js';
import { addDebtor, getDebtor, getDebtors, getDebtorSuggestion } from '../controllers/debtorController.js';

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
    '/:id',
    authenticateUser,
    getDebtor
);


export default router