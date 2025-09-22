import express from 'express'
import { authenticate } from '../middlewares/authenticateFirebase.js';
import { signup } from '../controllers/userController.js';

const router = express.Router();

// signup 
router.post(
    '/signup',
    authenticate,
    signup
)

export default router