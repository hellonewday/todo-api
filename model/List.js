const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let List = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    progress: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Label",
      required: false,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);
module.exports = mongoose.model("List", List);
