const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: false,
    },
    username: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
