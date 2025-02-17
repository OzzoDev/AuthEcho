const mongoose = require("mongoose");
const { getDate } = require("../utils/date");
const Schema = mongoose.Schema;

const InvocieSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isRead: {
    type: String,
    default: false,
  },
  sentAt: {
    type: String,
    default: getDate(),
  },
});

const InvoiceModel = mongoose.model("invoices", InvocieSchema);

module.exports = InvoiceModel;
