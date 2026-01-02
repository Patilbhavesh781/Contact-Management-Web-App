const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: /.+\@.+\..+/,
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
