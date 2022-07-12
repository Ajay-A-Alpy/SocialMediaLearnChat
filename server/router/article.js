const router = require("express").Router();
const controller = require("../controller/post/article");

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
router.post("/", auth, upload.single("image"), controller.createArticle);

//article
router.get("/", auth, controller.getArticles);

//update article posting
router.put("/:id", auth, upload.single("image"), controller.updateArticle);

//delete article
router.delete("/:id", auth, controller.deleteArticle);

//like an article
router.post("/like", auth, controller.likeArticle);

//unlike an article
//router.post("/unlike",auth, controller.unikeArticle);

//verify an article
//router.post("/verify",auth, controller.verifyArticle);

//unverify an article
//router.post("/unverify",auth, controller.unverifyArticle);

module.exports = router;
