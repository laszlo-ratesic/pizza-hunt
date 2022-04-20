const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const replySchema = new Schema({
  replyBody: {
    type: String,
  },
  writtenBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

const CommentSchema = new Schema({
  writtenBy: {
    type: String,
  },
  commentBody: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
