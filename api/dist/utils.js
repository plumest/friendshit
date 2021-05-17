"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateToken = function validateToken(req, res, next) {
  var authorizationHeaader = req.headers.authorization;
  var result;

  if (authorizationHeaader) {
    var token = req.headers.authorization.split(' ')[1]; // Bearer <token>

    var options = {
      expiresIn: '1d',
      issuer: 'https://scotch.io'
    };

    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, options); // Let's pass back the decoded token to the request object

      req.decoded = result; // We call next to pass execution to the subsequent middleware

      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      throw new Error(err);
    }
  } else {
    result = {
      error: "Authentication error. Token required.",
      status: 401
    };
    res.status(401).send(result);
  }
};

var _default = validateToken;
exports.default = _default;