import express from 'express'
import { authenticate } from '../middlewares/authenticateFirebase.js';

const router = express.Router();

// signup 
router.post(
    '/signup',
    authenticate
)

export default router