var postModel = require("../models/posts");

exports.createPost = async (req, res) => {

  const post = new postModel({
    uid: req.user._id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  try {
    await post.save();
    res.status(200).send({ message: "Post Created Successfully" });
  } catch (err) {
    console.log("Error creating Post", err);
    res.status(500).send({ message: err });
    return;
  }
};

exports.getPost = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({
      message: "Unable to get info",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    await postModel.findOneAndUpdate(
      { _id: req.params.id, uid: req.user._id },
      { title: req.body.title, description: req.body.description }
    );
    res.status(200).send({ message: "Post Updated Successfully" });
  } catch (err) {
    console.log("Error updating Post", err);
    res.status(500).send({ message: err });
    return;
  }
};

exports.deletePost = async (req, res) => {
  try {
    await postModel.deleteOne({ _id: req.params.id, uid: req.user._id });
    res.status(200).send({ message: "Post Deleted Successfully" });
  } catch (err) {
    console.log("Error deleting Post", err);
    res.status(500).send({ message: err });
    return;
  }
};

exports.getOnePost = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id, req.user._id);
    const posts = await postModel.findOne({
      _id: req.params.id,
    });
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({
      message: "Unable to get info",
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await postModel.find({ uid: req.params.uid });
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({
      message: "Unable to get information",
    });
  }
};
