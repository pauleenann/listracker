import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.js';
import { fetchCardStats } from '../controllers/dashboardController.js';

const router = express.Router();

router.get(
    '/stats',
    authenticateUser,
    fetchCardStats
)


export default router