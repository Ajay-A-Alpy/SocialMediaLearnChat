 const router =require('express').Router()
const controller= require('../controller/student/userController')

//student signup
 router.post('/signup',controller.signup );

 //student login
 router.post('/login',controller.login );

 //student profile update
 router.put('/profile/:id',controller.profile)

  //student follow
  router.post('/follow/:id',controller.follow)

//   //get followers
//     router.get('/follow/:id',controller.getFollowers)

 module.exports=router;