
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const studentModal =require('../models/user')
const secret=process.env.SECRET

exports.login= async (req,res)=>{
    console.log(req.body)
    const {email,password}=req.body;
    try{
        const olduser=await studentModal.findOne({email})
        if(!olduser){
            return res.status(400).json({message:"User doesn't exist"})
        }
        isPasswordCorrect=await bcrypt.compare(password,olduser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({id:olduser._id},secret,{expiresIn:"1h"})
      return  res.status(200).json({result:olduser,token})
    }
    catch(err){
        console.log(err)
    }

}


exports.signup= async (req,res)=>{
    const {name,email,password,mobile}=req.body;
    try{
        let olduser=await studentModal.findOne({email});
        if(olduser){
            return res.status(400).json({message:"user already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const result=await studentModal.create({
            name,
            email,
            password:hashedPassword,
            mobile,
        })
        const token=jwt.sign({id:result._id},secret,{expiresIn:"1h"});
       return  res.status(201).json({result,token})
    }
    catch(error){
        res.status(500).json({message:"something went wrong"})
        console.log(error)
    }
 }

 exports.profile=async (req,res)=>{
    
    console.log("profile reached")
    res.status(200).json({message:"profile reached"})
 }