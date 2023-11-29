var mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Label = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: "#f0eedf",
    },
  },
  {
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

module.exports = mongoose.model("Label", Label);
