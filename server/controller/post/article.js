const articleModel = require("../../models/articles");

// post new article
exports.createArticle = async (req, res) => {
  const article = req.body;
  if (req.file) {
    article.images = req.file.filename;
  }

  const newArticle = new articleModel({ ...article });
  try {
    newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
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
      { _id: postId },
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
    res.status(404).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await articleModel.find();

    res.status(201).json(articles);
  } catch (error) {
    res.status(404).json({ messsage: "something wernt wrong" });
  }
};

exports.deleteArticle = async (req, res) => {
  let postId = req.params.id;

  try {
    await articleModel.deleteOne({ _id: postId });
    res.status(201).json({ message: "successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "something went wrong" });
  }
};
