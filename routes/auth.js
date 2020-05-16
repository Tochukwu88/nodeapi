const express = require('express');
const {signUp,signin,signout}= require("../controllers/auth")
const {userById}= require("../controllers/user")
const {userSignupValidator} = require('../validators/index')
const router = express.Router();
 
 router.post('/signup',userSignupValidator,signUp)
 router.post('/signin',signin)
 router.get('/signout',signout)
 router.param("userId",userById)



module.exports = router