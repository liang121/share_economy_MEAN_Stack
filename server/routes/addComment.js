var express = require("express");
var router  = express.Router();
var mongojs = require('mongojs');

// var db = mongojs('mongodb:liang121:123@ds017195.mlab.com:17195/mongo_express',['userInfo']); 
var db_xchange = mongojs('xchange',['answer_question']);
var bodyParser = require('body-parser');
router.post('/add',function(req,res){
    var itemId = req.body.itemId;
    var questionIndex = req.body.questionIndex;
    var answerIndex = req.body.answerIndex;
    var commentObj = req.body.commentFieldContent;
    console.log(req.body);
    var pushQuery = {$push:{}};
    pushQuery.$push['questionContents.$.answers.'+answerIndex+'.comments'] = commentObj;
    db_xchange.answer_question.update(
        {
            itemId:'1002431',
            'questionContents.questionId': questionIndex
        },
        pushQuery,
        function(err,doc){
            if(err){
                return res.send(err);
            }else{
                return res.json(doc);
            }
        }
    )
    
})
 module.exports = router;