const router = require("express").Router();
const controller = require("../controller/expert/expertController");
const auth = require("../middleware/auth");

//expert signup
router.post("/signup", controller.signup);

//expert login
router.post("/login", controller.login);

//expert profile update
router.put("/profile/:id", auth, controller.profile);

//expert profile get
router.get("/viewProfile/:id", auth, controller.Viewprofile);

module.exports = router;
