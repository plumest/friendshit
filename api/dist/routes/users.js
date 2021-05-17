"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = _interopRequireDefault(require("../controllers/users.js"));

var _utils = _interopRequireDefault(require("../utils.js"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/users', _utils.default, function (req, res) {
  _users.default.getAll(req, res);
});
router.post('/users', function (req, res) {
  _users.default.add(req, res);
});
router.post('/login', function (req, res) {
  _users.default.login(req, res);
});
var _default = router;
exports.default = _default;