const express = require('express');
const {authCheck} = require("../controllers/auth")

const {userById,allUsers,getUser,updateUser, deleteUser}= require("../controllers/user")

const router = express.Router();
 
 
 router.get('/users',allUsers)
 router.get('/user/:userId',authCheck,getUser)
 router.put('/user/:userId',authCheck,updateUser)
 router.delete('/user/:userId',authCheck,deleteUser)
 router.param("userId",userById)



module.exports = router