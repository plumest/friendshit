"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _books = _interopRequireDefault(require("../models/books.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(req, res) {
  var result = {};
  var status = 201;
  var _req$body = req.body,
      owner = _req$body.owner,
      name = _req$body.name;
  var notes = [];
  var book = new _books.default({
    owner: owner,
    name: name,
    notes: notes
  });
  book.save().then(function (book) {
    result.status = status;
    result.result = book;
  }).catch(function (err) {
    console.log(err);
    status = 500;
    result.status = 500;
    result.error = err;
  }).finally(function () {
    res.status(status).send(result);
  });
};

var getOneBook = function getOneBook(req, res) {
  var _req$body2 = req.body,
      id = _req$body2.id,
      owner = _req$body2.owner;
  var result = {};
  var status = 200;

  _books.default.findOne({
    id: id
  }, {
    owner: owner
  }, function (err, book) {
    if (!err && book) {
      result.status = status;
      result.result = book;
    } else {
      status = 404;
      result.status = status;
      result.error = "Book not found";
    }

    res.status(status).send(result);
  }).catch(function (err) {
    status = 500;
    result.status = status;
    result.error = err;
    res.status(status).send(result);
  });
};

var updateBookPage = function updateBookPage(req, res) {
  var result = {};
  var status = 201;
  var _req$body3 = req.body,
      owner = _req$body3.owner,
      name = _req$body3.name,
      id = _req$body3.id,
      note = _req$body3.note;

  _books.default.findOne({
    id: id
  }, {
    owner: owner
  }, function (err, book) {
    if (!err && book) {
      book.update({
        $push: {
          notes: {
            note: note
          }
        }
      });
      result.status = status;
      result.result = book;
    } else {
      status = 404;
      result.status = status;
      result.error = "Book not found";
    }

    res.status(status).send(result);
    book.save().then(function (book) {
      result.status = status;
      result.result = book;
    }).catch(function (err) {
      console.log(err);
      status = 500;
      result.status = 500;
      result.error = err;
    }).finally(function () {
      res.status(status).send(result);
    });
  });
};

var _default = {
  create: create,
  getOneBook: getOneBook,
  updateBookPage: updateBookPage
};
exports.default = _default;