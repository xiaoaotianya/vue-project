var mongoose=require('mongoose');
var multer =require('multer')
var Upload=require('../models/upload.model')
exports.file=function(req,res,next){
    var upload=multer({dest:'uploads/'}).single('avatar');
    upload(req,res,function(err){
        
        // console.log(res.originalname.split('.'))
        var uploads=new Upload(req.file);
        uploads.cate=req.file.originalname.split('.')[1]
        uploads.save(function (err,data) {
            // console.log(data)
            if (err) {
              console.log(err);
            } else {
              res.json(data);
            }
        });
    })
    
   
}
exports.remove = function(req,res,next){
    // console.log(req.params.id)
    const id = req.params.id;
    // 从User这个数据模型里去找ID的对象并且将它进行更新操作
    Upload.findByIdAndRemove(id, function(err,data){
        res.json({"message":"delete ok"});
    })
}
exports.list = function(req,res,next){
    var page = (req.body.page) ? req.body.page: 1;
    var limit = (req.body.limit) ? req.body.limit: 2;
    // 查询条件
    var queryCondition = {};
    if(req.body.cate && req.body.cate.trim().length>0){
        var cate = req.body.cate;
        queryCondition = {
             "cate": cate
        }
    }
    Upload.paginate(queryCondition,{page: page,limit:limit},function(err,results){
        res.json(results)
    }) 
 }