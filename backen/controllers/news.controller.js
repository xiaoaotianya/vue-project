var mongoose = require('mongoose');
var News = require('../models/news.model');

exports.create = function(req,res,next){
    const news = new News(req.body); // req.body
    news.save(function (err,data) {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      });
}

exports.update = function(req,res,next){
    const id = req.params.id;
    // 从User这个数据模型里去找ID的对象并且将它进行更新操作
    News.findByIdAndUpdate(id, {$set: req.body},{new:false})
    .then(data=>{
        // 这个data数据返回的是没有修改之前的数据
        res.json(data);
    })
}

exports.remove = function(req,res,next){
    const id = req.params.id;
    // 从User这个数据模型里去找ID的对象并且将它进行更新操作
    News.findByIdAndRemove(id, function(err,data){
        res.json({"message":"delete ok"});
    })
}

exports.removes = function(req,res,next){
    var ids = req.body.ids;
    if(ids.length>0){
        News.remove({_id:{$in:ids}})
        .then(data=>{
            res.json({'message':"deletes ok"})
        })
    }
}

exports.list = function(req,res,next){
    var page = (req.body.page) ? req.body.page: 1;
    var limit = (req.body.limit) ? req.body.limit: 2;
    // 查询条件
    var queryCondition = {};
    
    if(req.body.title && req.body.title.trim().length>0){
            title = req.body.title;
            queryCondition = {
                "title": new RegExp(title,"i")
            }
    }
    else if(req.body.type && req.body.type.trim().length>0){
            type = req.body.type;
            queryCondition = Object.assign(queryCondition,{
                "type": new RegExp(type,"i")
            }) 
    }
    News.paginate(queryCondition,{page: page,limit:limit},function(err,results){
<<<<<<< HEAD
        res.json(results)
=======
        //res.json(results);
        // for(let i=0;i<results.length;i++){
        //     Comment.count({newsId: results.docs[i]._id}).then(data=>{
        //         results.docs[i].CommentCount = data;
        //     })
        // }

        async.map(results.docs,function(news,callback){
            Comment.count({newsId:news._id}).then(data=>{
                console.log(data)
                news.commentCount = data;
                callback(null,news)
            })
        },function(err){
            res.json(results);
        })
>>>>>>> c4bb82c1fb3b9a0cd993bdd97a6826f863ebf030
    })

}