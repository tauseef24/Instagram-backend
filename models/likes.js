var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var likeSchema = new Schema({
  postId: {
    type: String,
    required: [true, "PostId not provided"],
  },
  userId: {
    type: String,
    required: [true, "UserId Not Defined"]
  }
});

module.exports = mongoose.model("Likes", likeSchema);