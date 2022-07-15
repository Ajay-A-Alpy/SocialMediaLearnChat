const router = require("express").Router();
const controller = require("../controller/student/userController");
const auth = require("../middleware/auth");

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({storage: storage});

//student signup
router.post("/signup", controller.signup);

//student login
router.post("/login", controller.login);

//student profile update
router.put("/profile/:id", auth, controller.profile);

//student profile update
router.post("/profilePic", auth, upload.single("image"), controller.profilePic);

//student follow
router.post("/follow/:id", auth, controller.follow);

//student unfollow
router.post("/unfollow/:id", auth, controller.unfollow);

//student profile view
router.get("/viewProfile/:id", auth, controller.getProfile);

//get followers data
router.get("/getFollowers/:id", auth, controller.getFollowers);

//get followings data
router.get("/getFollowings/:id", auth, controller.getFollowings);

module.exports = router;
