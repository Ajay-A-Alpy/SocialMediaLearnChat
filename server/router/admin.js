const router = require("express").Router();
const controller = require("../controller/admin/adminController");
const auth = require("../middleware/auth");

//expert signup
router.post("/signup", controller.signup);

//expert login
router.post("/login", controller.login);

//expert profile update
router.put("/profile/:id", auth, controller.profile);

//get all articles
router.get("/getArticles", auth, controller.getAllArticles);

//get all students details
router.get("/getStudents", auth, controller.getAllStudents);

//get all   expert details
router.get("/getExperts", auth, controller.getAllExperts);

//block student
router.post("/block", auth, controller.block);

//unblock student
router.post("/unblock", auth, controller.unblock);

module.exports = router;
