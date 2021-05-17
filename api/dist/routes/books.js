"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _books = _interopRequireDefault(require("../controllers/books.js"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)(); // User

router.post('/:user_id/books', function (req, res) {
  _books.default.create(req, res);
});
router.get('/:user_id/books', function (req, res) {
  _books.default.getOneBook(req, res);
}); // Annon with link

router.get('/books/:bookId', function (req, res) {});
router.put('/books/:bookId', function (req, res) {});
var _default = router;
exports.default = _default;