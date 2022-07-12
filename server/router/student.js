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

    //student unfollow
    router.post('/unfollow/:id',auth,controller.unfollow)

    //student profile view
    router.get('/viewProfile/:id',auth,controller.getProfile)


//get followers data
    router.get('/getFollowers/:id',controller.getFollowers)

    //get followings data
    router.get('/getFollowings/:id',controller.getFollowings)

 module.exports=router;