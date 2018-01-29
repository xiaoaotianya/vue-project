var express =require('express');
var router=express.Router();
var dataCtrl=require('../controllers/upload.controller');

router.post('/file',dataCtrl.file);
router.post('/list',dataCtrl.list);
router.delete('/data/:id',dataCtrl.remove);
module.exports=router;