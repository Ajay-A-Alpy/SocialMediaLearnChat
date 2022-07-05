


const articleModel=require('../../models/articles')

 exports.createArticle= async(req,res)=>{
    const article=req.body;
    const newArticle=new articleModel({...article})

    try{

        newArticle.save();
        res.status(201).json(newArticle)

        

    }
    catch(error){
        res.status(404).json({message:"something went wrong"})
    }

}

exports.getArticles=async (req,res)=>{
    try{
        const articles=await articleModel.find();
        res.status(201).json(articles)

    }
    catch(error){
        res.status(404).json({messsage:"something wernt wrong"})
    }
}