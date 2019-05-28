var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var List = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model("List", List);
