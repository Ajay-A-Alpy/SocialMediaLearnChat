 const router =require('express').Router()
const controller= require('../controller/student/userController')
const auth=require('../middleware/auth')

//student signup
 router.post('/signup',controller.signup );

 //student login
 router.post('/login',controller.login );

 //student profile update
 router.put('/profile/:id',auth,controller.profile)

  //student follow
  router.post('/follow/:id',auth,controller.follow)

//   //get followers
//     router.get('/follow/:id',controller.getFollowers)

 module.exports=router;