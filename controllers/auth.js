const User = require('../models/users')
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
require('dotenv').config()

exports.signUp = async (req,res)=>{
  const user = await User.findOne({email:req.body.email})
  if(user){
      return res.status(403).json({
          error: "email is taken"
      })
  }

  const newUser = await new User({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
  })
  await newUser.save();
  res.status(200).json({message:"signup successful please login"})


}
exports.signin = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email},(err,user)=>{
        if(err || !user){
            return res.status(401).json({
                error:'user with that email does not exist'
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'email and password do not match'
            })
        }


        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        res.cookie("t", token, {expire:new Date() + 999})
        const {_id, name, email} = user
        return res.json({token, user:{_id,name,email}})

    })


}
exports.signout = (req,res)=>{
    res.clearCookie("t");
    res.json({
        message:"you have successfully signed out"
    })
}
exports.authCheck = expressjwt({

    secret:process.env.JWT_SECRET,
    userProperty:"auth"
})