const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  resource: { type: String, required: true },
  visibility: { type: String, enum: ["private", "public"], required: true },
});

const AppSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  admins: {
    type: [String],
    default: [],
  },
  resources: {
    type: [ResourceSchema],
    default: [],
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
