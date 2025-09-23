import express from 'express'
import { authenticate } from '../middlewares/authenticateFirebase.js';
import { generateNewAccessToken, signup } from '../controllers/userController.js';

const router = express.Router();

router.get(
    '/refresh-token',
    generateNewAccessToken
);
router.post(
    '/signup',
    authenticate,
    signup
);


export default router