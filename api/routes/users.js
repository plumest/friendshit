import controller from '../controllers/users.js';

import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
    controller.getAll(req, res)
});

router.post('/users', (req, res) => {
    controller.add(req, res)
});

router.post('/login', (req, res) => {
    controller.login(req, res)
});

export default router;