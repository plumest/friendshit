"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// schema maps to a collection
var Schema = _mongoose.default.Schema;
var userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: function _default() {
      return (0, _uuid.v4)();
    }
  },
  name: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  }
}); // encrypt password before save

userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified || !user.isNew) {
    // don't rehash if it's an old user
    next();
  } else {
    _bcrypt.default.hash(user.password, _config.default.saltingRounds, function (err, hash) {
      if (err) {
        console.log('Error hashing password for user', user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

var userModel = _mongoose.default.model('User', userSchema);

var _default2 = userModel;
exports.default = _default2;