const mongoose=require('mongoose');

const studentSchema= mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:false},
    mobile:{type:String,required:true},
    googleId:{type:String,required:false},
    place:{type:String},
    class:{type:String},
    institution:{type:String},
    subject:{type:[String]},
    hobby:{type:[String]}
})

module.exports=mongoose.model('students',studentSchema)
