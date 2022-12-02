require('dotenv').config()
const pool = require('./server/config/database')
const mysql = require('mysql');
const express = require('express');
const cors=require('cors');
const userRouter=require('./server/api/users/user.router');
const questionRouter=require('./server/api/questions/question.router');
const answerRouter=require('./server/api/answers/answer.router');
const app=express();
const port=process.env.PORT;
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/users',userRouter)
app.use('/api/questions',questionRouter)
app.use('/api/answers',answerRouter)


  app.listen(port,()=>console.log(`listenning at port http://localhost:${port}`));