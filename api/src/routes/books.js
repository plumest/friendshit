import controller from '../controllers/books.js';

import Router from 'express';

const router = Router();

// User
router.post('/:user_id/books', async (req, res) => {
    await controller.create(req, res);
});

router.get('/:user_id/books', (req, res) => {
    controller.getManyBook(req, res);
});


// Annon with link
router.get('/books/:bookId', (req, res) => {
    controller.getOneBook(req, res)
});

router.put('/books/:bookId', (req, res) => {
    controller.updateBookPage(req, res)
});

export default router;
