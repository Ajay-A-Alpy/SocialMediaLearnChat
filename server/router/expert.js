const router =require('express').Router()
const controller= require('../controller/expert/expertController')

//student signup
 router.post('/signup',controller.signup );

 //student login
 router.post('/login',controller.login );

 //student profile update
 router.put('/profile/:id',controller.profile)

 module.exports=router;