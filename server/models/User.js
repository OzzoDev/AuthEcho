const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getDate } = require("../utils/utils");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: String,
    default: getDate(),
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
