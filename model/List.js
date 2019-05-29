var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var List = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: "No description..."
  },
  likes: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model("List", List);
