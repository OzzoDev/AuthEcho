const mongoose = require("mongoose");
const { getDate } = require("../utils/date");
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
    required: true,
  },
  prevVerificationCode: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  suspended: {
    type: Boolean,
    default: false,
  },
  blocked: {
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
  securityQuestion: {
    type: String,
    default: "",
  },
  securityQuestionAnswer: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
    default: getDate(),
  },
  createdApps: {
    type: [String],
    default: [],
  },
  adminApps: {
    type: [String],
    default: [],
  },
  appConnections: {
    type: [String],
    default: [],
  },
  adminKey: {
    type: String,
    default: null,
  },
});

UserSchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 1 } });
UserSchema.index({ email: 1 }, { unique: true, collation: { locale: "en", strength: 1 } });

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
