const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

  text: {
    type: String,
    required: true,
  },

  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);