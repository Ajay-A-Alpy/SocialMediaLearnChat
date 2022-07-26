const articleModel = require("../../models/articles");
const mongoose = require("mongoose");

// post new article
exports.createArticle = async (req, res) => {
  const article = req.body;

  if (req.file) {
    article.images = req.file.filename;
  }

  const newArticle = new articleModel({...article});
  try {
    newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(404).json({message: "something went wrong"});
  }
};

//update article
exports.updateArticle = async (req, res) => {
  const postId = req.params.id;
  const article = req.body;
  if (req.file) {
    article.images = req.file.filename;
  }

  try {
    let doc = await articleModel.findOneAndUpdate(
      {_id: postId},
      {
        title: article.title,
        subject: article.subject,
        description: article.description,
        images: article?.images,
      }
    );
    console.log("updated");
    console.log(doc);
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json({message: "something went wrong"});
    console.log(error);
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await articleModel.find();
    res.status(201).json(articles);
  } catch (error) {
    console.log("no articles");
    res.status(404).json({messsage: "something went wrong"});
  }
};

exports.deleteArticle = async (req, res) => {
  let postId = req.params.id;

  try {
    await articleModel.deleteOne({_id: postId});
    res.status(201).json({message: "successfully deleted"});
  } catch (err) {
    console.log(err);
    res.status(404).json({message: "something went wrong"});
  }
};

//like articles

exports.likeArticle = async (req, res) => {
  console.log(req.body);
  let postId = req.body.post;
  let userId = req.body.user;
  console.log("like reached");
  let file = await articleModel.findOne({_id: postId});

  try {
    if (file.likes.includes(mongoose.Types.ObjectId(userId)) == false) {
      if (file.likes.length > 0) {
        await articleModel.findOneAndUpdate(
          {_id: postId},
          {$push: {likes: mongoose.Types.ObjectId(userId)}},
          {new: true}
        );
      } else {
        await articleModel.findOneAndUpdate(
          {_id: postId},
          {likes: mongoose.Types.ObjectId(userId)},
          {new: true}
        );
      }
      return res.status(201).json({message: "You have liked post"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};

exports.unlikeArticle = async (req, res) => {
  let postId = req.body.post;
  let userId = req.body.user;
  console.log("unlike reached");

  try {
    await articleModel.findOneAndUpdate(
      {_id: postId},
      {$pull: {likes: mongoose.Types.ObjectId(userId)}},
      {new: true}
    );

    return res.status(201).json({message: "You have unliked article"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};

exports.verifyArticle = async (req, res) => {
  let postId = req.body.post;
  let expertId = req.body.user;
  console.log("verify reached");
  let file = await articleModel.findOne({_id: postId});

  try {
    if (
      file.verifiedCount.includes(mongoose.Types.ObjectId(expertId)) == false
    ) {
      if (file.verifiedCount.length > 0) {
        await articleModel.findOneAndUpdate(
          {_id: postId},
          {$push: {verifiedCount: mongoose.Types.ObjectId(expertId)}},
          {new: true}
        );
      } else {
        await articleModel.findOneAndUpdate(
          {_id: postId},
          {verifiedCount: mongoose.Types.ObjectId(expertId)},
          {new: true}
        );
      }
      return res.status(201).json({message: "You have verified article"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};

exports.unverifyArticle = async (req, res) => {
  let postId = req.body.post;
  let expertId = req.body.user;
  console.log("unverify reached");

  try {
    await articleModel.findOneAndUpdate(
      {_id: postId},
      {$pull: {verifiedCount: mongoose.Types.ObjectId(expertId)}},
      {new: true}
    );

    return res.status(201).json({message: "You have unverify article"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};

exports.addComment = async (req, res) => {
  let postId = req.body.postId;
  let {commentorId, text, commentedAt, commentedBy} = req.body;
  let newComment = {commentorId, commentedAt, text, commentedBy};
  try {
    await articleModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(postId),
      },
      {$push: {comments: newComment}}
    );
    console.log("new message added");
    res.status(201).json({message: "you have successfully commented"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};
