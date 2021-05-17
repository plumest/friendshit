import controller from '../controllers/users.js';
import validateToken from '../utils.js'

import Router from 'express';

const router = Router();

router.get('/users', validateToken, (req, res) => {
    controller.getAll(req, res)
});

router.post('/users', (req, res) => {
    controller.add(req, res)
});

router.post('/login', (req, res) => {
    controller.login(req, res)
});

export default router;
