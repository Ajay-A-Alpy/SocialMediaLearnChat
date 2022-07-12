const articleModel = require("../../models/articles");

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
    console.log(article);
    console.log(postId);
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
  let postId = req.body.post;
  let userId = req.body.user;
  console.log("like reached");
  let file = await articleModel.findOne({_id: postId});

  if (file.likes.includes(mongoose.Types.ObjectId(userId)) == false) {
    if (file.likes.length > 0) {
      await studentModal.findOneAndUpdate(
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
  } else {
    res.status(500).json({message: "something went wrong"});
  }
};

exports.unlikeArticle = async (req, res) => {
  let postId = req.body.post;
  let userId = req.body.user;
  console.log("like reached");
  let file = await articleModel.findOne({_id: postId});

  try {
    await studentModal.findOneAndUpdate(
      {_id: postId},
      {$push: {likes: mongoose.Types.ObjectId(userId)}},
      {new: true}
    );

    return res.status(201).json({message: "You have liked post"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};

function adf() {}
