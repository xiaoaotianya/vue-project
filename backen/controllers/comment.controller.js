var mongoose = require('mongoose');
var Comment = require('../models/comment.model');

exports.create = function(req,res,next){
    const comment = new Comment(req.body); // req.body
    comment.save(function (err,data) {
        if (err) {
          console.log(err);
          console.log(22222);
        } else {
          res.json(data);
          console.log(99999);
          
        }
      });

}

exports.update = function(req,res,next){
    const id = req.params.id;
    // 从User这个数据模型里去找ID的对象并且将它进行更新操作
    Comment.findByIdAndUpdate(id, {$set: req.body},{new:false})
    .then(data=>{
        // 这个data数据返回的是没有修改之前的数据
        res.json(data);
    })
}

exports.remove = function(req,res,next){
    const id = req.params.id;
    // 从User这个数据模型里去找ID的对象并且将它进行更新操作
    Comment.findByIdAndRemove(id, function(err,data){
        res.json({"message":"delete ok"});
    })
}


exports.removes=function(req,res,next){
    var ids=req.body.ids;
    if(ids.length>0){
        Comment.remove({
            _id:{$in: ids}
        }).then(data=>{
            res.json({'message':'delete ok'})
        })
    }
}

exports.list = function(req,res,next){
   var page = (req.body.page) ? req.body.page: 1;
   var limit = (req.body.limit) ? req.body.limit: 2;
   // 查询条件
   var queryCondition = {};
   if(req.body.id && req.body.id.trim().length>0){
       
        queryCondition = {
            "newsId": req.body.id
        }
    }
    if(req.body.name && req.body.name.trim().length>0){
       name = req.body.name;
       queryCondition = Object.assign(queryCondition,{
        "name": new RegExp(name,"i")
       })
   } 

   Comment.paginate(queryCondition,{page: page,limit:limit},function(err,results){
       res.json(results)
   })

}