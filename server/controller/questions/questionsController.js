const QuestionModel = require("../../models/questions");
const mongoose = require("mongoose");

// post new article
exports.createQuestion = async (req, res) => {
  const question = req.body;
  console.log("create", req.body);
  console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", req.file);
  if (req.file) {
    question.images = req.file.filename;
  }
  const newQuestion = new QuestionModel({...question});
  try {
    newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(404).json({message: "something went wrong"});
  }
};

// exports.updateArticle = async (req, res) => {
//   const postId = req.params.id;
//   const article = req.body;
//   if (req.file) {
//     article.images = req.file.filename;
//   }

//   try {
//     console.log(article);
//     console.log(postId);
//     let doc = await articleModel.findOneAndUpdate(
//       {_id: postId},
//       {
//         title: article.title,
//         subject: article.subject,
//         description: article.description,
//         images: article?.images,
//       }
//     );
//     console.log("updated");
//     console.log(doc);
//     res.status(201).json(doc);
//   } catch (error) {
//     res.status(404).json({message: "something went wrong"});
//     console.log(error);
//   }
// };

exports.getQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    res.status(201).json(questions);
  } catch (error) {
    console.log("no questions");
    res.status(404).json({messsage: "something went wrong"});
  }
};

// exports.deleteArticle = async (req, res) => {
//   let postId = req.params.id;

//   try {
//     await articleModel.deleteOne({_id: postId});
//     res.status(201).json({message: "successfully deleted"});
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({message: "something went wrong"});
//   }
// };
