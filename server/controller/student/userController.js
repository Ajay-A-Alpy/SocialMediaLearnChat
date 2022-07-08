const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentModal = require("../../models/user");
const secret = process.env.SECRET;
const mongoose = require("mongoose");

exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const olduser = await studentModal.findOne({ email });
    if (!olduser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    isPasswordCorrect = await bcrypt.compare(password, olduser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: olduser._id }, secret, { expiresIn: "1h" });
    return res.status(200).json({ result: olduser, token });
  } catch (err) {
    console.log(err);
  }
};

exports.signup = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    let olduser = await studentModal.findOne({ email });
    if (olduser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await studentModal.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      createdAt: new Date(),
    });
    const token = jwt.sign({ id: result._id }, secret, { expiresIn: "1h" });
    return res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.profile = async (req, res) => {
  console.log("update reched");
  let Id = req.params.id;
  let userData = req.body;
  console.log(req.body);
  try {
    let doc = await studentModal.findOneAndUpdate(
      { _id: Id },
      { ...userData },
      { new: true }
    );
    console.log("hello");
    console.log(doc);
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
  }
};

exports.follow = async (req, res) => {
  userId = req.params.id;

  finderId = req.body.userId;
  console.log(finderId);

  try {
    let file = await studentModal.findOne({ finderId });
    console.log(file);
    if (file.followers.includes(mongoose.Types.ObjectId(userId)) == false) {
      if (file.followers.length > 0) {
        console.log("kkkkkk");
        await studentModal.findOneAndUpdate(
          { _id: finderId },
          { $push: { followers: mongoose.Types.ObjectId(userId) } }
        );
        await studentModal.findOneAndUpdate(
          { _id: userId },
          { $push: { following: mongoose.Types.ObjectId(finderId) } }
        );
      } else {
        console.log("hhhhhh");
        await studentModal.findOneAndUpdate(
          { _id: finderId },
          { followers: mongoose.Types.ObjectId(userId) }
        );

        await studentModal.findOneAndUpdate(
          { _id: userId },
          { $push: { following: mongoose.Types.ObjectId(finderId) } }
        );
      }

      console.log("vvvvv");

      res.status(201).json(file);
    } else {
      console.log("rrrrr");
      res.status(500).json({ message: "something went wrong" });
    }
  } catch (err) {
    console.log(err);
  }
};


// exports.getFollowers = async (req, res) => {
//     let userId=req.params.id

//     try {

//         await studentModal.aggregate([
//             {
//                 $match:

//             },
//             {
//                 $unwind:"$followers"
//             },
//             {
//                $lookup:{
//                 from
//                }
//             }

//         ])



    
  
//       res.status(201).json(articles);
//     } catch (error) {
//       res.status(404).json({ messsage: "something wernt wrong" });
//     }
//   };
  
