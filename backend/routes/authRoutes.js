import express from 'express'
import { authenticate } from '../middlewares/authenticateFirebase.js';
import { generateNewAccessToken, signin, signout, signup } from '../controllers/userController.js';

const router = express.Router();

router.get(
    '/refresh-token',
    generateNewAccessToken
);
router.post(
    '/signin',
    signin
)
router.post(
    '/signout',
    signout
);
router.post(
    '/signup',
    authenticate,
    signup
);


export default router