 const router =require('express').Router()
const controller= require('../controller/userController')

//student signup
 router.post('/signup',controller.signup );

 //student login
 router.post('/login',controller.login );

 //student profile update
 router.put('/profile',controller.profile)

 module.exports=router;