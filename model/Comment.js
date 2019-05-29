var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = Schema({
     content: {
          type: String,
          required: true
     },
     todo: {
          type: Schema.Types.ObjectId,
          ref: 'List',
          required: true
     },
     likes: {
          type: Number,
          default: 0
     },
     created: {
          type: Date,
          default: Date.now()
     }
})
module.exports = mongoose.model('Comment',CommentSchema);