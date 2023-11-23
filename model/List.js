var mongoose = require("mongoose");
const Comment = require("./Comment");
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
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});
module.exports = mongoose.model("List", List);
