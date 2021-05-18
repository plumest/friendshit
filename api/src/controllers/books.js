import Book from '../models/books.js';

const create = (req, res) => {
    let result = {};
    let status = 201;

    const { name } = req.body;
    const owner = req.params.user_id;
    const notes = [];
    const book = new Book({ owner, name, notes });

    Book.findById(owner).then(() => {
        book.save()
            .then(book => {
                result.status = status;
                result.result = book;
            }).catch(err => {
            console.log(err)
            status = 500
            result.status = 500;
            result.error = err;
        }).finally(() => {
            res.status(status).send(result);
        });
    }).catch(err => console.log(err))
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

    console.log("owner = ", owner)
    Book.find({owner: owner}, (err, book) => {
        if (!err && book) {
            console.log("book = ", book)
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

    const { note } = req.body;
    const bookId = req.params.bookId;

    Book.findOne({ bookId }, (err, book) => {
        if (!err && book) {
            if (!book.pathHistory) {
                book.pathHistory = [];
                await book.save();
            }
            console.log(paths)
            await book.update({
                $push:
                    {pathHistory : paths}});
            book.save()
                .then(book => {
                    result.status = status;
                    result.result = book;
                    res.status(status).send(result);
                }).catch(err => {
                console.log(err)
                status = 500
                result.status = 500;
                result.error = err;
                res.status(status).send(result);
            })
        } else {
            status = 404;
            result.status = status;
            result.error = "Book not found"
            res.status(status).send(result);
        }


})
}

export default { create, getOneBook, getManyBook, updateBookPage };
