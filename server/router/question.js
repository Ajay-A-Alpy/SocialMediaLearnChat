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

//new article posting
router.post("/", auth, upload.single("image"), controller.createQuestion);

//new article posting
router.get("/", auth, controller.createQuestion);

module.exports = router;
