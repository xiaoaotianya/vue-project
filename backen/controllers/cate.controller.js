var mongoose = require('mongoose');
var Cate = require('../models/cate.model');

exports.create = function(req,res,next){
    const cate = new Cate(req.body); // req.body
    cate.save(function (err,data) {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      });

}

exports.update = function(req,res,next){
    const id = req.params.id;
    Cate.findByIdAndUpdate(id, {$set: req.body},{new:false})
    .then(data=>{
        res.json(data);
    })
}

exports.remove = function(req,res,next){
    // 删除我们不能和User一样直接删除
    var id = req.params.id;
    var ids = [];
    console.log(id);
    Cate.findOne({_id: id},function(err,doc){
        if( doc ){
            // 把当前找到的这个对象的id加到数组里
            ids = [doc._id];

            doc.getChildren(function(err, docs){
                for(let i =0;i <docs.length;i++){
                    ids.push(docs[i]._id); // 把所有子节点的id加到数组里
                }
                
                Cate.remove({_id: { $in: ids}})
                .then(deleted=>{
                    res.json({"message":"deleted ok!"})
                })

            });
        
        }
    })
   
}

function reverseTree(data,pid){
    var result = [],
    temp;

    // 原来传递进来的data是数据模型的对象
    // 我们将它转成字符串，再转成object，现在这个object就变成了普通的javascript的对象
    var data = JSON.parse(JSON.stringify(data));

    for(var i in data){
        if( data[i].parentId === pid){
            result.push( data[i] );

            temp = reverseTree(data, data[i]._id);

            if(temp.length>0){
                data[i].children = temp;
            }
        }
    }
    return result;

}


exports.list = function(req,res,next){
    var type=req.params.type ||0
    Cate.find({type:type},function(err,data){
        var rpTree = reverseTree(data,null);
        res.json(rpTree);
    })
    // 列表我们不能和User一样直接分页列表

}