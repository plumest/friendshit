"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config.js"));

var _users = _interopRequireDefault(require("../models/users.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtSecret = _config.default.jwtSecret;

var add = function add(req, res) {
  var result = {};
  var status = 201;
  var _req$body = req.body,
      name = _req$body.name,
      password = _req$body.password;
  var user = new _users.default({
    name: name,
    password: password
  }); // document = instance of a model
  // TODO: We can hash the password here before we insert instead of in the model

  user.save().then(function (user) {
    result.status = status;
    result.result = user;
  }).catch(function (err) {
    console.log(err);
    status = 500;
    result.status = 500;
    result.error = err;
  }).finally(function () {
    res.status(status).send(result);
  });
};

var getAll = function getAll(req, res) {
  var result = {};
  var status = 200;
  var payload = req.decoded;

  if (payload && payload.user === 'admin') {
    _users.default.find({}, function (err, users) {
      if (!err) {
        result.status = status;
        result.error = err;
        result.result = users;
      } else {
        status = 500;
        result.status = status;
        result.error = err;
      }

      res.status(status).send(result);
    });
  } else {
    status = 401;
    result.status = status;
    result.error = "Authentication error";
    res.status(status).send(result);
  }
};

var login = function login(req, res) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      password = _req$body2.password;
  var result = {};
  var status = 200;

  _users.default.findOne({
    name: name
  }, function (err, user) {
    if (!err && user) {
      // We could compare passwords in our model instead of below
      _bcrypt.default.compare(password, user.password).then(function (match) {
        if (match) {
          // Create a token
          var payload = {
            user: user.name
          };
          var options = {
            expiresIn: '1d',
            issuer: 'https://scotch.io'
          };
          result.token = _jsonwebtoken.default.sign(payload, jwtSecret, options);
          result.status = status;
          result.result = user;
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication error';
        }

        res.status(status).send(result);
      }).catch(function (err) {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      });
    } else {
      status = 404;
      result.status = status;
      result.error = err;
      res.status(status).send(result);
    }
  });
};

var _default = {
  add: add,
  login: login,
  getAll: getAll
};
exports.default = _default;