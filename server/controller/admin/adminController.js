const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModal = require("../../models/admin");
const secret = process.env.SECRET;
const StudentModel = require("../../models/user");
const ExpertModel = require("../../models/expert");
const ArticleModel = require("../../models/articles");

exports.login = async (req, res) => {
  console.log("admin login");
  console.log(req.body);
  const {email, password} = req.body;
  try {
    const olduser = await AdminModal.findOne({email});
    if (!olduser) {
      return res.status(400).json({message: "User doesn't exist"});
    }
    isPasswordCorrect = await bcrypt.compare(password, olduser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({message: "Invalid credentials"});
    }
    const token = jwt.sign({id: olduser._id}, secret, {expiresIn: "1h"});
    return res.status(200).json({result: olduser, token});
  } catch (err) {
    console.log(err);
  }
};

exports.signup = async (req, res) => {
  console.log("hello admin signup");
  const {name, email, password, mobile} = req.body;
  try {
    let olduser = await AdminModal.findOne({email});
    if (olduser) {
      return res.status(400).json({message: "user already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await AdminModal.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      isAdmin: true,
      createdAt: new Date(),
    });
    const token = jwt.sign({id: result._id}, secret, {expiresIn: "1h"});
    return res.status(201).json({result, token});
  } catch (error) {
    res.status(500).json({message: "something went wrong"});
    console.log(error);
  }
};

exports.profile = async (req, res) => {
  console.log("expert update reched");

  let Id = req.params.id;
  if (Id != req.userId) {
    return res.status(500).json({message: "something went wrong"});
  }

  let userData = req.body;

  try {
    let doc = await AdminModal.findOneAndUpdate(
      {_id: Id},
      {...userData},
      {new: true}
    );

    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllStudents = async (req, res) => {
  console.log("get all students reached");
  try {
    let studentsData = await StudentModel.find({});
    return res.status(201).json(studentsData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "something went wrong"});
  }
};

exports.getAllExperts = async (req, res) => {
  console.log("get all experts reached");
  try {
    let expertsData = await ExpertModel.find({});
    return res.status(201).json(expertsData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "something went wrong"});
  }
};

exports.getAllArticles = async (req, res) => {
  console.log("get all experts reached");
  try {
    let articlesData = await ArticleModel.find({});
    return res.status(201).json(articlesData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "something went wrong"});
  }
};

exports.block = async (req, res) => {
  console.log("block reached");
  let {userId, isExpert} = req.body;
  try {
    if (isExpert) {
      await ExpertModel.updateOne(
        {_id: userId},
        {
          $set: {
            blockStatus: true,
          },
        }
      );
    } else {
      await StudentModel.updateOne(
        {_id: userId},
        {
          $set: {
            blockStatus: true,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

exports.unblock = async (req, res) => {
  console.log("unblock reached");
  let {userId, isExpert} = req.body;
  try {
    if (isExpert) {
      console.log(userId, "expertssssss unblock");
      await ExpertModel.updateOne(
        {_id: userId},
        {
          $set: {
            blockStatus: false,
          },
        }
      );
    } else {
      console.log(userId, "studenttt unblock");
      await StudentModel.updateOne(
        {_id: userId},
        {
          $set: {
            blockStatus: false,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    console.log("hello", req.body);
    console.log("get one user reached");
    let olduser = await StudentModel.findById(req.body.id);
    if (!olduser) olduser = await ExpertModel.findById(req.body.id);

    if (!olduser) {
      res.status(400).json({message: "user not found"});
    }
    return res.status(200).json({result: olduser});
  } catch (err) {
    console.log(err);
  }
};

exports.searchUser = async (req, res) => {
  try {
    console.log("hello", req.body);
    console.log("search user reached");
    let pattern = `${req.body.query}`;
    let olduser = await StudentModel.find({
      name: {$regex: pattern, $options: "i"},
    });
    if (!olduser)
      olduser = await ExpertModel.find({
        name: {$regex: pattern, $options: "i"},
      });

    if (!olduser) {
      res.status(400).json({message: "user not found"});
    }
    console.log("jjjjjjjjj", olduser);
    return res.status(200).json({result: olduser});
  } catch (err) {
    console.log(err);
  }
};
