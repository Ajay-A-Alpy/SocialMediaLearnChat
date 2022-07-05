const router=require('express').Router()
const controller=require('../controller/post/article')

//new article posting
router.post("/",controller.createArticle);

//article 
router.get("/",controller.getArticles)

module.exports=router;