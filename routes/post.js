const express = require('express');
const {getPosts,postbyuser,createPost,postById,isPoster,deletePost,updatePost}= require("../controllers/post")
const {authCheck}= require("../controllers/auth")
const {postValidator} = require('../validators/index')
const {userById}= require("../controllers/user")

const router = express.Router();
 router.get('/posts', getPosts)
 router.get('/posts/by/:userId',authCheck, postbyuser)
 router.delete('/post/:postId',authCheck, isPoster,deletePost)
 router.put('/post/:postId',authCheck,updatePost)
 router.post('/post/new/:userId',authCheck,createPost,postValidator)
 router.param("userId",userById)
 router.param("postId",postById)
 



module.exports = router