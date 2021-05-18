import Book from '../models/books.js';

const logging = require("$logging").getLogger(__filename);

const create = async (req, res) => {
    let result = {
        status: 201
    };
    try {
    const { name } = req.body;
    const owner = req.params.user_id;
    const book = new Book({owner, name});
    await book.save()
        result.result = book
        res.status(result.status).send(result);
    }
    catch (err) {
        result.status = 500;
        result.error = err.message;
        res.status(result.status).send(result);
    }
}

const getOneBook = (req, res) => {
    const bookId = req.params.bookId;

    let result = {};
    let status = 200;

    Book.findOne({_id: bookId }, (err, book) => {
         if (!err && book) {
             result.status = status;
             result.result = book;
        } else {
             status = 404;
             result.status = status;
             result.error = "Book not found"
         }
         res.status(status).send(result);
    }).catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
    });
}

const getManyBook = (req, res) => {
    const owner = req.params.user_id;

    let result = {};
    let status = 200;

    logging.debug("owner = ", owner)
    Book.find({owner: owner}, (err, book) => {
        if (!err && book) {
            logging.debug("book = ", book)
            result.status = status;
            result.result = book;
        } else {
            status = 404;
            result.status = status;
            result.error = "Book not found"
        }
        res.status(status).send(result);
    }).catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
    });
}

const updateBookPage = (req, res) => {
    let result = {};
    let status = 201;

    const { paths } = req.body;
    const bookId = req.params.bookId;

    Book.findOne({ _id: bookId }, async (err, book) => {
        if (!err && book) {
            if (!book.pathHistory) {
                book.pathHistory = [];
                await book.save();
            }
            await book.update({
                $push:
                    {pathHistory : paths}});
            book.save()
                .then(book => {
                    result.status = status;
                    result.result = book;
                    res.status(status).send(result);
                }).catch(err => {
                logging.error(err.message)
                status = 500
                result.status = 500;
                result.error = err;
                res.status(status).send(result);
            })
        } else {
            status = 404;
            result.status = status;
            result.error = "Book not found for updating"
            res.status(status).send(result);
        }


})
}

export default { create, getOneBook, getManyBook, updateBookPage };
