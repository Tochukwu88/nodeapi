const User = require('../models/users')
const _ = require('lodash');

exports.userById = (req,res,next, id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            res.status(400).json({
                error:"user not found"
            })
        }
        req.profile = user
        next()
    })

}
exports.hasAuthorization = (req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id && req.auth._id;
   if(!authorized){
       res.status(403).json({
           error:"user is unauthorized"
       })
   }
   next()
}

exports.allUsers =(req,res)=>{
    User.find((err,users)=>{
        if(err){
          return  res.status(400).json({
                  error:err
            })
        }
        res.json({users})
    }).select("name email updated createdAt")
}
exports.getUser = (req,res) =>{
    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    return res.json(
        req.profile
    )
}
exports.updateUser = (req,res,next)=>{
    
    let user = req.profile
   user = _.extend(user,req.body)
   user.updated = Date.now()
   user.save((err)=>{
       if (err){
           res.json({error:"unauthorized"})
       }
       user.hashed_password=undefined
       user.salt=undefined
       res.json({user})
   })
}
exports.deleteUser =(req,res,next) =>{
    let user = req.profile
    user.remove((err,user)=>{
        if (err){
            res.json({error:err})
        }
        user.hashed_password=undefined
        user.salt=undefined
        res.json({message:"deleted!"})

    })
}