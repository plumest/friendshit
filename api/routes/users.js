import controller from '../controllers/users.js';

import { Router } from 'express';

const router = Router();

router.post('/users', (req, res) => {
    controller.add(req, res)
});

router.post('/login', (req, res) => {
    controller.login(req, res)
});

export default router;