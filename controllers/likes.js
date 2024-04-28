const likeModel = require("../models/likes");
const postModel = require("../models/posts");

exports.likePost = async (req, res) => {
  try{

    const posts = await postModel.find({
      _id: req.params.id
    })
    if(posts.length == 0) {
      res.status(500).send({message: "Post Not Found"});
      return;
    }
    const likes = await likeModel.find({
      postId: req.params.id,
      userId: req.user._id,
    });
    if (likes.length == 0) {
      const createLike = new likeModel({
        postId: req.params.id,
        userId: req.user._id,
      });
      try {
        await createLike.save();
        await postModel.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { likes: 1 } }
        );
        res.status(200).send({ message: "Liked Post Successfully" });
        return;
      } catch (err) {
        console.log("Error liking Post: ", err);
        res.status(500).send({ message: err });
        return;
      }
    } else {
      try {
        await likeModel.deleteOne({
          postId: req.params.id,
          userId: req.user._id,
        });
        await postModel.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { likes: -1 } }
        );
        res.status(200).send({ message: "Unliked Post Successfully" });
      } catch (err) {
        console.log("Error unliking Post: ", err);
        res.status(500).send({ message: err });
        return;
      }
    }
  } catch(err) {
    res.status(500).send({message: "Error Liking Post"})
  }
};
