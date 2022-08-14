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

exports.getQuestions = async (req, res) => {
  try {
    console.log("get questions reached");
    const questions = await QuestionModel.find().sort({createdAt: -1});
    res.status(201).json(questions);
  } catch (error) {
    console.log("no questions");
    res.status(404).json({messsage: "something went wrong"});
  }
};

exports.deleteQuestion = async (req, res) => {
  let Id = req.params.id;
  console.log("question delete reached");
  try {
    await QuestionModel.deleteOne({_id: Id});
    res.status(201).json({message: "successfully deleted"});
  } catch (err) {
    console.log(err);
    res.status(404).json({message: "something went wrong"});
  }
};

exports.addAnswer = async (req, res) => {
  console.log("add answer reached");
  let Id = req.body.questionId;
  let {commentorId, text, commentedAt, commentedBy} = req.body;
  let newAnswer = {commentorId, commentedAt, text, commentedBy};
  try {
    await QuestionModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(Id),
      },
      {$push: {answers: newAnswer}}
    );
    console.log("new Answer added");
    res.status(201).json({message: "you have successfully Answered"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};
