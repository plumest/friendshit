import controller from '../controllers/users.js';
import validateToken from '../utils.js'


import { Router } from 'express';

const router = Router();

router.get('/users', validateToken, (req, res) => {
    controller.getAll(req, res)
});

router.post('/users', async (req, res, next) => {
    await controller.add(req, res, next)
});

router.post('/login', async (req, res) => {
    await controller.login(req, res)
});

export default router;
