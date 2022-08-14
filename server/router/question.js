const router = require("express").Router();
const controller = require("../controller/questions/questionsController");

const path = require("path");

const auth = require("../middleware/auth");

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

//create
router.post("/", auth, upload.single("image"), controller.createQuestion);

//get
router.get("/", controller.getQuestions);

//delete
router.delete("/:id", auth, controller.deleteQuestion);

// add answer
router.post("/answer", controller.addAnswer);

module.exports = router;
