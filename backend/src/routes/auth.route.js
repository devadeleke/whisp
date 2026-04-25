import { Router } from 'express';

const router = Router();

router.get('/signup', (req, res) => {
    // Handle signup logic here
    res.send('Signup endpoint');
});

export default router;