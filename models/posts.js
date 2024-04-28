var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var postSchema = new Schema({
  uid: {
    type: String,
    required: [true, "id not provided"],
  },
  title: {
    type: String,
    required: [true, "name not provided"],
  },
  description: {
    type: String,
    required: [true, "Description not provided"],
  },
  imageUrl: {
    type: String,
    required: [true, "ImageUrl not provided"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
