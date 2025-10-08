import express from 'express'
import { authenticateUser } from '../middlewares/authenticate.js';
import { addDebt, deleteDebt, editDebt, getDebts, getTotalStatus } from '../controllers/debtController.js';

const router = express.Router();

router.get(
    '/',
    authenticateUser,
    getDebts
);
router.post(
    '/',
    authenticateUser,
    addDebt
);
router.put(
    '/',
    authenticateUser,
    editDebt
);
router.get(
    '/status',
    authenticateUser,
    getTotalStatus
);
router.delete(
    '/:id',
    authenticateUser,
    deleteDebt
);

export default router