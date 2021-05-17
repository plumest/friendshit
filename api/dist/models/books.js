"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// schema maps to a collection
var Schema = _mongoose.default.Schema;
var bookSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: function _default() {
      return (0, _uuid.v4)();
    }
  },
  owner: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  notes: [{
    note: {
      type: 'String',
      required: true,
      trim: true,
      unique: true
    }
  }]
});

var bookModel = _mongoose.default.model('Book', bookSchema);

var _default2 = bookModel;
exports.default = _default2;