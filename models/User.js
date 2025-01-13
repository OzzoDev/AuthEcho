const mongoose = require("mongoose");
const { getDate } = require("../utils/date");
const { hex8BitKey } = require("../utils/crypto");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    default: hex8BitKey(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
  suspended: {
    type: Boolean,
    default: false,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: String,
    default: getDate(),
  },
  securityQuestionId: {
    type: String,
    default: "-1",
  },
  securityQuestionAnswer: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
    default: getDate(),
  },
});

UserSchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 1 } });
UserSchema.index({ email: 1 }, { unique: true, collation: { locale: "en", strength: 1 } });

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
