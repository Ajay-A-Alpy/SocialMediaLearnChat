const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expertModal = require("../../models/expert");
const secret = process.env.SECRET;

exports.login = async (req, res) => {
  console.log("expert login");
  console.log(req.body);
  const {email, password} = req.body;
  try {
    const olduser = await expertModal.findOne({email});
    if (!olduser) {
      return res.status(400).json({message: "User doesn't exist"});
    }
    if (olduser.blockStatus) {
      return res.status(400).json({message: "User Account is Blocked"});
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

exports.getExpertData = async (req, res) => {
  let Id = req.userId;
  console.log("get expert reached", req.userId);
  try {
    let oldUser = await expertModal.findById(Id);
    if (oldUser) {
      res.status(200).json({result: oldUser});
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({message: "something went wrong"});
  }
};

exports.signup = async (req, res) => {
  const {name, email, password, mobile} = req.body;
  try {
    let olduser = await expertModal.findOne({email});
    if (olduser) {
      return res.status(400).json({message: "user already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await expertModal.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      expert: true,
      public: true,
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
    let doc = await expertModal.findOneAndUpdate(
      {_id: Id},
      {...userData},
      {new: true}
    );

    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
  }
};

exports.Viewprofile = async (req, res) => {
  console.log("expert view  reched");
  let Id = req.params.id;
  try {
    let doc = await expertModal.findOne({_id: Id});
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
  }
};
