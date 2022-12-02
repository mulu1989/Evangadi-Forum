const router=require('express').Router();

const {createAnswer,getAnswerByQuestionId}=require('./answer.controller');
router.post('/',createAnswer);
router.get('/all',getAnswerByQuestionId);

module.exports=router;