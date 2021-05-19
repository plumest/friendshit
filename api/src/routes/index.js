import users from './users.js';
import books from './books.js';

import { Router } from 'express';

const router = Router();


router.use(books)
router.use(users)
router.get('/config', function (req, res,next) {
    res.json({'csrfToken': req.csrfToken()})
})

export default router
