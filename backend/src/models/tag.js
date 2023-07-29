// models/tag.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tag", TagSchema);
