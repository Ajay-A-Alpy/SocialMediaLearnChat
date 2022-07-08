const router=require('express').Router()
const controller=require('../controller/post/article')

const path=require('path')
// const image=require('../images')

const multer  = require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
       
        cb(null,Date.now() + path.extname(file.originalname))
    }

})
const upload = multer({ storage:storage})

//new article posting
router.post("/", upload.single('image'), controller.createArticle);

//article 
router.get("/",controller.getArticles)

//update article posting
router.put("/:id", upload.single('image'), controller.updateArticle);

//delete article
router.delete("/:id", controller.deleteArticle);






module.exports=router;