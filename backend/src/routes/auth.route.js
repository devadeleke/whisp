import { Router } from 'express';
import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/check-auth', protectRoute, (req, res) => res.status(200).json(req.user));

router.put('/update-profile', protectRoute, updateProfile);

export default router;