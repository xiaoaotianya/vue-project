var mongoose = require('mongoose');
var User = require('../models/user.model');
exports.create = function(req,res,next){
    const user = new User(req.body); // req.body
    user.save(function (err,data) {
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
    User.findByIdAndUpdate(id, {$set: req.body},{new:false})
    .then(data=>{
        // 这个data数据返回的是没有修改之前的数据
        res.json(data);
    })
}
exports.delM = function(req,res,next){
   var delists=req.body.delists;
   if(delists.length>0){
       User.remove({_id:{$in:delists}})
       .then(data=>{
           res.json({'message':'ojbk'});
       })
   }
}
exports.remove = function(req,res,next){
    const id = req.params.id;
    // 从User这个数据模型里去找ID的对象并且将它进行更新操作
    User.findByIdAndRemove(id, function(err,data){
        res.json({"message":"delete ok"});
    })
}

exports.list = function(req,res,next){
   var page = (req.body.page) ? req.body.page: 1;
   var limit = (req.body.limit) ? req.body.limit: 2;
   // 查询条件
   var queryCondition = {};
   if(req.body.name && req.body.name.trim().length>0){
       name = req.body.name;
       queryCondition = {
            "name": new RegExp(name,"i")
       }
   }

   User.paginate(queryCondition,{page: page,limit:limit},function(err,results){
       res.json(results)
   })

}

exports.login=function(req,res,next){
    var name=req.body.name;
    var password=req.body.password;
    User.findOne({name:name,password:password}).then(rs=>{
        if(rs){
            res.json(rs)
        }else{
            res.json({'message':'用户名或者密码错误'})
        }
    })

    


}

exports.ishe = function(req,res,next){
    var name=req.body.name;
    User.findOne({name:name}).then(rs=>{
        if(rs){
            res.json(rs)
        }else{
            res.json({'message':'用户名或者密码错误'})
        }
    })   
}
