const express = require('express');
const app = express();
const  mongoose = require('mongoose')
const morgan = require('morgan')
//const dotenv = require('dotenv')
const expressValidator = require('express-validator')
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:true,useCreateIndex:true})
.then(()=>console.log("db connected"))
.catch((err)=>{
    console.log(err.message)
})
app.use(expressValidator())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/', postRoutes);
app.use('/',userRoutes)
app.use('/', authRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error:"please login"});
    }
  });

const port = process.env.PORT||8000;
app.listen(port,()=>{console.log(`server started on port:${port}`)})