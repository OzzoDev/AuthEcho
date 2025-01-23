const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  key: {
    type: String,
    required: true,
  },
});

AppSchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 1 } });

const AppModel = mongoose.model("apps", AppSchema);

module.exports = AppModel;
