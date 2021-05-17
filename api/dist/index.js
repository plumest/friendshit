"use strict";

var _config = _interopRequireDefault(require("./config.js"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));

_mongoose.default.connect(_config.default.connUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(function (error) {
  return console.log(error);
});

if (_config.default.environment !== 'production') {
  app.use((0, _morgan.default)('dev'));
}

app.use('/api/v1', _index.default.users);
app.listen(_config.default.port, function () {
  console.log("Server is running on ".concat(_config.default.baseUrl, ":").concat(_config.default.port, "/"));
});