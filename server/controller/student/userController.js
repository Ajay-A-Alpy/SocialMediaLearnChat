const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const studentModal = require("../../models/user");
const StudentModal = require("../../models/user");

const mongoose = require("mongoose");
const ArticleModal = require("../../models/articles");
const ExpertModel = require("../../models/expert");

exports.login = async (req, res) => {
  console.log(req.body);
  const {email, password} = req.body;
  try {
    const olduser = await studentModal.findOne({email});
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

exports.getUserData = async (req, res) => {
  let Id = req.userId;
  console.log("get user data", Id);
  try {
    const olduser = await studentModal.findById(Id);
    if (olduser) {
      console.log("olduser", olduser);
      return res.status(200).json({result: olduser});
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: "something went wrong"});
  }
};

exports.signup = async (req, res) => {
  const {name, email, password, mobile} = req.body;
  try {
    let olduser = await studentModal.findOne({email});
    if (olduser) {
      return res.status(400).json({message: "user already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await studentModal.create({
      name,
      email,
      password: hashedPassword,
      mobile,
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
  console.log(" student update reched");
  let Id = req.params.id;

  if (Id != req.userId) {
    return res.status(500).json({message: "something went wrong"});
  }
  let userData = req.body;

  try {
    let doc = await studentModal.findOneAndUpdate(
      {_id: Id},
      {...userData},
      {new: true}
    );

    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
  }
};

exports.follow = async (req, res) => {
  let userId = req.params.id;
  finderId = req.body.followId;
  let user;
  let following;
  let followed;
  let currentUser;

  try {
    console.log("follow reached");
    let file = await studentModal.findOne({_id: finderId});

    if (file.followers.includes(mongoose.Types.ObjectId(userId)) == false) {
      if (file.followers.length > 0) {
        followed = await studentModal.findOneAndUpdate(
          {_id: finderId},
          {$push: {followers: mongoose.Types.ObjectId(userId)}},
          {new: true}
        );
        currentUser = await studentModal.findOneAndUpdate(
          {_id: userId},
          {$push: {following: mongoose.Types.ObjectId(finderId)}},
          {new: true}
        );
      } else {
        followed = await studentModal.findOneAndUpdate(
          {_id: finderId},
          {followers: mongoose.Types.ObjectId(userId)},
          {new: true}
        );

        currentUser = await studentModal.findOneAndUpdate(
          {_id: userId},
          {$push: {following: mongoose.Types.ObjectId(finderId)}},
          {new: true}
        );
      }

      if (followed.following.includes(mongoose.Types.ObjectId(userId))) {
        console.log("friends reached");
        following = await studentModal.findOneAndUpdate(
          {_id: finderId},
          {$push: {friends: mongoose.Types.ObjectId(userId)}},
          {new: true}
        );
        user = await studentModal.findOneAndUpdate(
          {_id: userId},
          {$push: {friends: mongoose.Types.ObjectId(finderId)}},
          {new: true}
        );
      }

      return res.status(201).json({user, following});
    } else {
      res.status(500).json({message: "something went wrong"});
    }
  } catch (err) {
    console.log(err);
  }
};

exports.followExpert = async (req, res) => {
  let userId = req.params.id;
  finderId = req.body.followId;
  let user;
  let following;
  let followed;
  let currentUser;

  try {
    console.log("follow  expert reached");
    let file = await ExpertModel.findOne({_id: finderId});

    if (file.students.includes(mongoose.Types.ObjectId(userId)) == false) {
      if (file.students.length > 0) {
        followed = await ExpertModel.findOneAndUpdate(
          {_id: finderId},
          {$push: {students: mongoose.Types.ObjectId(userId)}},
          {new: true}
        );
        currentUser = await studentModal.findOneAndUpdate(
          {_id: userId},
          {$push: {experts: mongoose.Types.ObjectId(finderId)}},
          {new: true}
        );
      } else {
        followed = await ExpertModel.findOneAndUpdate(
          {_id: finderId},
          {students: mongoose.Types.ObjectId(userId)},
          {new: true}
        );

        currentUser = await studentModal.findOneAndUpdate(
          {_id: userId},
          {$push: {experts: mongoose.Types.ObjectId(finderId)}},
          {new: true}
        );
      }

      return res.status(201).json({currentUser, followed});
    } else {
      res.status(500).json({message: "something went wrong"});
    }
  } catch (err) {
    console.log(err);
  }
};

exports.unfollow = async (req, res) => {
  let userId = req.params.id;
  finderId = req.body.followId;
  let user;
  let unfollowing;
  let unfollowed;
  let currentUser;

  try {
    console.log("unfollow reached");

    unfollowed = await studentModal.findOneAndUpdate(
      {_id: finderId},
      {$pull: {followers: mongoose.Types.ObjectId(userId)}},
      {new: true}
    );
    currentUser = await studentModal.findOneAndUpdate(
      {_id: userId},
      {$pull: {following: mongoose.Types.ObjectId(finderId)}},
      {new: true}
    );

    if (unfollowed.friends.includes(mongoose.Types.ObjectId(userId))) {
      console.log("unfriend done");
      unfollowing = await studentModal.findOneAndUpdate(
        {_id: finderId},
        {$pull: {friends: mongoose.Types.ObjectId(userId)}},
        {new: true}
      );
      user = await studentModal.findOneAndUpdate(
        {_id: userId},
        {$pull: {friends: mongoose.Types.ObjectId(finderId)}},
        {new: true}
      );
    }

    return res.status(201).json({user, unfollowing});
  } catch (err) {
    res.status(500).json({message: "something went wrong"});
    console.log(err);
  }
};

exports.getProfile = async (req, res) => {
  let userId = req.params.id;
  console.log("view profile reached");
  console.log(userId);

  try {
    let user = await studentModal.findOne({
      _id: userId,
    });
    let articleList = await ArticleModal.find({
      userId: userId,
    });

    res.status(201).json({user, articleList});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};

exports.unfollowExpert = async (req, res) => {
  let userId = req.params.id;
  finderId = req.body.followId;

  let unfollowed;
  let currentUser;

  try {
    console.log("unfollow  expert reached");

    unfollowed = await ExpertModel.findOneAndUpdate(
      {_id: finderId},
      {$pull: {students: mongoose.Types.ObjectId(userId)}},
      {new: true}
    );
    currentUser = await studentModal.findOneAndUpdate(
      {_id: userId},
      {$pull: {experts: mongoose.Types.ObjectId(finderId)}},
      {new: true}
    );

    return res.status(201).json({currentUser, unfollowed});
  } catch (err) {
    res.status(500).json({message: "something went wrong"});
    console.log(err);
  }
};

exports.getProfile = async (req, res) => {
  let userId = req.params.id;
  console.log("view profile reached");
  console.log(userId);

  try {
    let user = await studentModal.findOne({
      _id: userId,
    });
    let articleList = await ArticleModal.find({
      userId: userId,
    });

    res.status(201).json({user, articleList});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};

exports.getFollowers = async (req, res) => {
  let userId = mongoose.Types.ObjectId(req.userId);
  console.log(userId);

  try {
    const myfollowers = await StudentModal.aggregate([
      {
        $match: {_id: userId},
      },
      {
        $unwind: "$followers",
      },
      {
        $project: {myfollowers: "$followers"},
      },

      {
        $lookup: {
          from: "students",
          localField: "myfollowers",
          foreignField: "_id",
          as: "people",
        },
      },
      {
        $project: {
          person: {$arrayElemAt: ["$people", 0]},
        },
      },
    ]);

    res.status(201).json(myfollowers);
  } catch (error) {
    res.status(404).json({messsage: "something went wrong"});
  }
};

exports.getFollowings = async (req, res) => {
  let userId = mongoose.Types.ObjectId(req.userId);
  console.log(userId);

  try {
    const myfollowings = await StudentModal.aggregate([
      {
        $match: {_id: userId},
      },
      {
        $unwind: "$following",
      },
      {
        $project: {myfollowing: "$following"},
      },

      {
        $lookup: {
          from: "students",
          localField: "myfollowing",
          foreignField: "_id",
          as: "people",
        },
      },
      {
        $project: {
          person: {$arrayElemAt: ["$people", 0]},
        },
      },
    ]);
    res.status(201).json(myfollowings);
  } catch (error) {
    res.status(404).json({messsage: "something went wrong"});
  }
};

exports.getFriends = async (req, res) => {
  console.log("hello", req.userId);
  let userId = mongoose.Types.ObjectId(req.userId);
  console.log(userId);

  try {
    const Myfriends = await StudentModal.aggregate([
      {
        $match: {_id: userId},
      },
      {
        $unwind: "$friends",
      },
      {
        $project: {myfriends: "$friends"},
      },

      {
        $lookup: {
          from: "students",
          localField: "myfriends",
          foreignField: "_id",
          as: "people",
        },
      },
      {
        $project: {
          person: {$arrayElemAt: ["$people", 0]},
        },
      },
    ]);

    res.status(201).json(Myfriends);
  } catch (error) {
    res.status(404).json({messsage: "something wernt wrong"});
  }
};

exports.profilePic = async (req, res) => {
  let userId = req.body.userId;
  let picName = req.file ? req.file.filename : "profile.jpg";

  try {
    let user = await studentModal.findOneAndUpdate(
      {
        _id: userId,
      },
      {profilePic: picName},
      {new: true}
    );
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({messsage: "something wernt wrong"});
  }
};
