const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SNSPostsSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  snapshots: {
    type: Array,
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  brands: {
    type: Array,
    default: [],
  },
});

const SNSPost = mongoose.model("SNSPost", SNSPostsSchema);

module.exports = { SNSPost };
