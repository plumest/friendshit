import controller from '../controllers/books.js';

import Router from 'express';
import {authenticateJwt} from "$root/jwt";

const router = Router();
const userRouter = Router();

// User
userRouter.post('/:user_id/books', async (req, res) => {
    await controller.create(req, res);
});

userRouter.get('/:user_id/books', (req, res) => {
    controller.getManyBook(req, res);
});

router.use(authenticateJwt, userRouter)
// Annon with link
router.get('/books/:bookId', (req, res) => {
    controller.getOneBook(req, res)
});

router.put('/books/:bookId', (req, res) => {
    controller.updateBookPage(req, res)
});

export default router;
