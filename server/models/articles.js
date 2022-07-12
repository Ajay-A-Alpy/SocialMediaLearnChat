const mongoose=require('mongoose')


const articleSchema=mongoose.Schema({
    title:{type:String,required:true},
    userId:mongoose.ObjectId,
    username:{type:String,required:true},
    description:{type:String,required:true},
    subject:{type:String,required:true},
    images:String,
    likes:{type:[mongoose.ObjectId]},
    verifiedBy:{type:[mongoose.ObjectId]},
    public:Boolean,
    comments:[{
        commentorId:mongoose.ObjectId,
        comment:String,
        commentedAt:{type:Date,dafault:Date.now}
    }],
})

articleSchema.set('timestamps',true);
const ArticleModal=mongoose.model("studentArticles",articleSchema);
 module.exports=ArticleModal;