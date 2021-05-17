"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var config = {
  environment: process.env.NODE_ENV,
  baseUrl: process.env.BASE_URL || 'localhost',
  port: process.env.PORT || 3000,
  saltingRounds: 12,
  connUri: process.env.MONGO_LOCAL_CONN_URL,
  jwtSecret: process.env.JWT_SECRET || 'secret'
};
var _default = config;
exports.default = _default;