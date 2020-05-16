exports.postValidator=(req,res,next)=>{
    req.check('title','Title is required').notEmpty();
    req.check("title" ,"title must be more than 4 characters").isLength({min:4})
    req.check('body','body is required').notEmpty();
    req.check('body','body must be more than 4 characters').isLength({
        min:4
    });
     const errors = req.validationErrors()
     if(errors){
        const firstErrors = errors.map((error)=>error.msg)[0]
        return res.status(400).json({
           error:firstErrors
       })

     }
     
    next();
};
exports.userSignupValidator = (req,res,next) =>{
    req.check('name','name is required').notEmpty();
    req.check('email','email is required')
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage('email must contain @')
    req.check('password','password is required').notEmpty()
    .isLength({min:6})
    .withMessage('password must contain 6 characters')
    .matches(/\d/)
    .withMessage('password must contain a number');

    const errors = req.validationErrors()
     if(errors){
        const firstErrors = errors.map((error)=>error.msg)[0]
        return res.status(400).json({
           error:firstErrors
       })

     }
     
    next();
}