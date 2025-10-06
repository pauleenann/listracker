import express from 'express'
import { authenticateUser } from '../middlewares/authenticate.js';
import { addDebt, deleteDebt, editDebt, getDebt } from '../controllers/debtController.js';

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
router.put(
    '/',
    authenticateUser,
    editDebt
);
router.delete(
    '/:id',
    authenticateUser,
    deleteDebt
);


export default router